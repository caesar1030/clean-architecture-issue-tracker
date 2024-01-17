import { Issue } from '../../../domain/model/issue/issue';
import IssueDataSource from '../issue-data-source';
import supabase from './supabase-db/supabase';
import { injectable } from 'inversify';
import {
  CloseIssuesPayload,
  CreateIssuePayload,
  EditIssueTitlePayload,
  GetIssuePayload,
  IssuesFilterPayload,
  OpenIssuesPayload,
} from '../../../domain/model/issue/payload';
import { IssueEntity, IssuesEntity } from '../../entity/issue-api-entity';

@injectable()
export default class IssueDataSourceImpl implements IssueDataSource {
  async getIssue(getIssuePayload: GetIssuePayload): Promise<IssueEntity> {
    const { issueId } = getIssuePayload;
    const dataQuery = this.buildGetIssueQuery(issueId);
    const { data, error } = await dataQuery;

    if (error) throw new Error('이슈를 불러오지 못했습니다.');

    // TODO: 타입 오류 해결
    return {
      data,
    } as unknown as IssueEntity;
  }

  async getIssues(issuesFilterPayload: IssuesFilterPayload) {
    const dataQuery = this.buildGetIssuesQuery(issuesFilterPayload);
    const openIssueCountQuery =
      this.buildGetOpenIssuesCountQuery(issuesFilterPayload);
    const closeIssueCountQuery =
      this.buildGetCloseIssuesCountQuery(issuesFilterPayload);

    const [
      { data, error },
      { count: openIssueCount, error: openIssueCountQueryError },
      { count: closeIssueCount, error: closeIssueCountQueryError },
    ] = await Promise.all([
      dataQuery,
      openIssueCountQuery,
      closeIssueCountQuery,
    ]);

    if (error || openIssueCountQueryError || closeIssueCountQueryError) {
      throw new Error('이슈를 불러오지 못했습니다.');
    }

    return {
      data,
      openIssueCount,
      closeIssueCount,
    } as unknown as IssuesEntity;
  }

  async openIssues(openIssuesPayload: OpenIssuesPayload): Promise<void> {
    const { issueIds } = openIssuesPayload;
    const toUpsert = issueIds.map((id) => {
      return {
        id,
        is_open: true,
      };
    });

    const { error } = await supabase.from('issues').upsert(toUpsert);

    if (error) {
      throw new Error('이슈를 열지 못했습니다.');
    }

    return;
  }

  async closeIssues(closeIssuesPayload: CloseIssuesPayload): Promise<void> {
    const { issueIds } = closeIssuesPayload;
    const toUpsert = issueIds.map((id) => {
      return {
        id,
        is_open: false,
      };
    });

    const { error } = await supabase.from('issues').upsert(toUpsert);

    if (error) {
      throw new Error('이슈를 닫지 못했습니다.');
    }

    return;
  }

  async createIssue(createIssuePayload: CreateIssuePayload): Promise<void> {
    const { title, contents, labelId, milestoneId, authorId, assigneeId } =
      createIssuePayload;

    const { error } = await supabase.from('issues').insert({
      title,
      contents,
      label_id: labelId,
      milestone_id: milestoneId,
      assignee_id: assigneeId,
      author_id: authorId,
    });

    if (error) throw new Error('이슈를 생성하지 못했습니다.');

    return;
  }

  async editTitle(editIssueTitlePayload: EditIssueTitlePayload): Promise<void> {
    const { issueId: id, title } = editIssueTitlePayload;

    const { error } = await supabase
      .from('issues')
      .update({ title })
      .eq('id', id);

    if (error) throw new Error('제목을 수정하지 못했습니다.');

    return;
  }

  private buildGetIssueQuery(id: Issue['id']) {
    const query = supabase
      .from('issues')
      .select(
        'id, title, is_open, created_at, comments(id,contents,created_at, author:author_id(*)), labels(id,title, text_color, background_color), milestones(id,title), author:author_id(*), assignee:assignee_id(*)'
      )
      .eq('id', id)
      .single();

    return query;
  }

  private buildGetIssuesQuery(issuesFilterPayload: IssuesFilterPayload) {
    const { isOpen } = issuesFilterPayload;
    const { labelInner, milestoneInner, assigneeInner, authorInner } =
      this.determineInner(issuesFilterPayload);

    let query = supabase
      .from('issues')
      .select(
        `id, title, is_open, created_at, labels${labelInner}(id, title, text_color, background_color), milestones${milestoneInner}(id, title), author:author_id${authorInner}(*), assignee:assignee_id${assigneeInner}(*)`
      );

    query = this.applyFilterOptions(query, issuesFilterPayload);

    if (isOpen === true) query = query.eq('is_open', true);
    if (isOpen === false) query = query.eq('is_open', false);

    query.order('created_at', { ascending: false });

    return query;
  }

  private buildGetOpenIssuesCountQuery(
    issuesFilterPayload: IssuesFilterPayload
  ) {
    const { labelInner, milestoneInner, assigneeInner, authorInner } =
      this.determineInner(issuesFilterPayload);

    let query = supabase
      .from('issues')
      .select(
        `labels${labelInner}(id, title, text_color, background_color), milestones${milestoneInner}(id, title), author:author_id${authorInner}(*), assignee:assignee_id${assigneeInner}(*)`,
        { count: 'exact' }
      );

    query = this.applyFilterOptions(query, issuesFilterPayload);

    query.eq('is_open', true);

    return query;
  }

  private buildGetCloseIssuesCountQuery(
    issuesFilterPayload: IssuesFilterPayload
  ) {
    const { labelInner, milestoneInner, assigneeInner, authorInner } =
      this.determineInner(issuesFilterPayload);

    let query = supabase
      .from('issues')
      .select(
        `labels${labelInner}(id, title, text_color, background_color), milestones${milestoneInner}(id, title), author:author_id${authorInner}(*), assignee:assignee_id${assigneeInner}(*)`,
        { count: 'exact' }
      );

    query = this.applyFilterOptions(query, issuesFilterPayload);

    query.eq('is_open', false);

    return query;
  }

  private determineInner(issuesFilterPayload: IssuesFilterPayload) {
    const { labelTitle, milestoneTitle, assigneeNickname, authorNickname } =
      issuesFilterPayload;

    const labelInner = labelTitle ? '!inner' : '';
    const milestoneInner = milestoneTitle ? '!inner' : '';
    const assigneeInner = assigneeNickname ? '!inner' : '';
    const authorInner = authorNickname ? '!inner' : '';

    return {
      labelInner,
      milestoneInner,
      assigneeInner,
      authorInner,
    };
  }

  private applyFilterOptions(
    query: any,
    issuesFilterPayload: IssuesFilterPayload
  ) {
    const {
      labelTitle,
      milestoneTitle,
      assigneeNickname,
      authorNickname,
      likes,
      no,
    } = issuesFilterPayload;

    if (labelTitle) query = query.eq('labels.title', labelTitle);
    if (no?.label) query = query.is('labels', null);

    if (milestoneTitle) query = query.eq('milestones.title', milestoneTitle);
    if (no?.milestone) query = query.is('milestones', null);

    if (assigneeNickname)
      query = query.eq(
        'assignee.raw_user_meta_data->>nickname',
        assigneeNickname
      );
    if (no?.assignee) query = query.is('assignee', null);

    if (authorNickname)
      query = query.eq('author.raw_user_meta_data->>nickname', authorNickname);

    if (likes?.length) {
      const likesFilterColumns = ['contents', 'title'];

      const likesFilterQuery = likesFilterColumns
        .map((likesFilterColumn) => {
          const andQuery = likes
            .map((like) => `${likesFilterColumn}.ilike.%${like}%`)
            .join(',');

          return `and(${andQuery})`;
        })
        .join(', ');

      query = query.or(likesFilterQuery);
    }

    return query;
  }
}
