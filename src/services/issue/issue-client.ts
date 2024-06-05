import { IssueEntity, IssuesEntity } from '@/data/entity/issue-api-entity';
import {
  CloseIssuesPayload,
  CreateIssuePayload,
  DeleteIssuePayload,
  EditIssuePayload,
  GetIssuePayload,
  IssuesFilterPayload,
  OpenIssuesPayload,
} from '@/domain/model/issue/payload';
import supabase from '@/data/data-source/api/supabase-db/supabase';
import { IssueResponse, IssuesResponse } from '@/domain/model/issue/response';
import { User } from '@/domain/model/user/user';
import { Milestone } from '@/domain/model/milestone/milestone';
import { Label } from '@/domain/model/label/label';
import IssueClientService from '@/services/issue/issue-client-service';

export default class IssueClient implements IssueClientService {
  async getIssue({ issueId }: GetIssuePayload): Promise<IssueResponse> {
    const query = supabase
      .from('issues')
      .select(
        'id, title, contents, is_open, created_at, comments(id,contents,created_at, author:author_id(*)), labels(id,title, text_color, background_color), milestones(id,title), author:author_id(*), assignee:assignee_id(*)'
      )
      .eq('id', issueId)
      .maybeSingle();

    const { data, error } = await query;

    if (error) throw new Error('이슈를 불러오지 못했습니다.');

    return this.mapIssue({ data } as unknown as IssueEntity);
  }

  async getIssues(
    issuesFilterPayload: IssuesFilterPayload
  ): Promise<IssuesResponse> {
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

    return this.mapIssues({
      data,
      openIssueCount,
      closeIssueCount,
    } as unknown as IssuesEntity);
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

  async deleteIssue(deleteIssuePayload: DeleteIssuePayload): Promise<void> {
    const { id } = deleteIssuePayload;
    const { error } = await supabase.from('issues').delete().eq('id', id);

    if (error) throw new Error('이슈를 삭제하지 못했습니다.');

    return;
  }

  async editIssue(editIssuePayload: EditIssuePayload): Promise<void> {
    const { id, title, milestoneId, assigneeId, contents, labelId } =
      editIssuePayload;

    const toUpdate: {
      title?: string;
      contents?: string;
      milestone_id?: Milestone['id'] | null;
      assignee_id?: User['id'] | null;
      label_id?: Label['id'] | null;
    } = {};
    if (title) toUpdate.title = title;
    if (contents) toUpdate.contents = contents;
    if (milestoneId !== undefined) toUpdate.milestone_id = milestoneId;
    if (assigneeId !== undefined) toUpdate.assignee_id = assigneeId;
    if (labelId !== undefined) toUpdate.label_id = labelId;

    const { error } = await supabase
      .from('issues')
      .update(toUpdate)
      .eq('id', id);

    if (error) throw new Error(error.message);

    return;
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

  private mapIssue(entity: IssueEntity): IssueResponse {
    const {
      data: {
        id,
        contents,
        title,
        created_at,
        is_open,
        labels,
        milestones,
        comments,
        assignee,
        author,
      },
    } = entity;

    return {
      data: {
        id,
        contents,
        title,
        createdAt: new Date(created_at),
        isOpen: is_open,
        author: {
          id: author.id,
          avatar: author.raw_user_meta_data.avatar,
          nickname: author.raw_user_meta_data.nickname,
        },
        assignee: assignee
          ? {
              id: assignee.id,
              avatar: assignee.raw_user_meta_data.avatar,
              nickname: assignee.raw_user_meta_data.nickname,
            }
          : null,
        label: labels
          ? {
              id: labels.id,
              title: labels.title,
              textColor: labels.text_color,
              backgroundColor: labels.background_color,
            }
          : null,
        milestone: milestones
          ? {
              id: milestones.id,
              title: milestones.title,
            }
          : null,
        comments: comments
          ? comments.map((comment) => ({
              id: comment.id,
              contents: comment.contents,
              createdAt: new Date(comment.created_at),
              author: {
                id: comment.author.id,
                avatar: comment.author.raw_user_meta_data.avatar,
                nickname: comment.author.raw_user_meta_data.nickname,
              },
            }))
          : null,
      },
    };
  }

  private mapIssues(entity: IssuesEntity): IssuesResponse {
    const { data, openIssueCount, closeIssueCount } = entity;

    return {
      data: data.map(
        ({
          id,
          title,
          created_at,
          is_open,
          labels,
          milestones,
          assignee,
          author,
        }) => {
          return {
            id,
            title,
            isOpen: is_open,
            createdAt: new Date(created_at),
            label: labels
              ? {
                  id: labels.id,
                  title: labels.title,
                  textColor: labels.text_color,
                  backgroundColor: labels.background_color,
                }
              : null,
            milestone: milestones
              ? {
                  id: milestones.id,
                  title: milestones.title,
                }
              : null,
            author: {
              id: author.id,
              avatar: author.raw_user_meta_data.avatar,
              nickname: author.raw_user_meta_data.nickname,
            },
            assignee: assignee
              ? {
                  id: assignee.id,
                  avatar: assignee.raw_user_meta_data.avatar,
                  nickname: author.raw_user_meta_data.nickname,
                }
              : null,
          };
        }
      ),
      openIssueCount,
      closeIssueCount,
    };
  }
}
