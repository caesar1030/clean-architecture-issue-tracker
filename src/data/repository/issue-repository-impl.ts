import { inject, injectable } from 'inversify';
import { Issue } from '../../domain/model/issue';
import {
  EditTitleData,
  IssueCreationData,
  IssueDetail,
  IssueFilterOptions,
  IssueRepository,
  IssuesSummary,
} from '../../domain/repository/issue-repository';
import {
  IssueDetailEntity,
  IssueSummaryEntity,
} from '../entity/issue-api-entity';
import type IssueDataSource from '../data-source/issue-data-source';
import { TYPES } from '../../di/types';
import { Label } from '../../domain/model/label';
import { Milestone } from '../../domain/model/milestone';
import { User } from '../../domain/model/user';
import { Comment } from '../../domain/model/comment';

@injectable()
export class IssueRepositoryImpl implements IssueRepository {
  private _datasource: IssueDataSource;

  constructor(@inject(TYPES.IssueDataSource) dataSource: IssueDataSource) {
    this._datasource = dataSource;
  }
  async getIssue(id: Issue['id']): Promise<IssueDetail> {
    const entity = await this._datasource.getIssue(id);

    return this.mapIssueDetail(entity);
  }

  async getIssues(filterOptions: IssueFilterOptions): Promise<IssuesSummary> {
    const entity = await this._datasource.getIssues(filterOptions);

    return this.mapIssueSummary(entity);
  }

  async openIssues(ids: Issue['id'][]): Promise<void> {
    return this._datasource.openIssues(ids);
  }

  async closeIssues(ids: Issue['id'][]): Promise<void> {
    return this._datasource.closeIssues(ids);
  }

  async createIssue(newIssue: IssueCreationData): Promise<void> {
    return this._datasource.createIssue(newIssue);
  }

  async editTitle(editTitleData: EditTitleData): Promise<void> {
    return this._datasource.editTitle(editTitleData);
  }

  private mapIssueDetail(entity: IssueDetailEntity): IssueDetail {
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
        users,
      },
    } = entity;

    return {
      data: {
        id: id as Issue['id'],
        contents: contents as Issue['contents'],
        title: title as Issue['title'],
        createdAt: new Date(created_at) as Issue['createdAt'],
        isOpen: is_open as Issue['isOpen'],
        author: {
          id: users.id as User['id'],
          avatar: users.raw_user_meta_data.avatar as User['avatar'],
          nickname: users.raw_user_meta_data.nickname as User['nickname'],
        },
        label: labels
          ? {
              id: labels.id as Label['id'],
              title: labels.title as Label['title'],
              textColor: labels.text_color as Label['textColor'],
              backgroundColor:
                labels.background_color as Label['backgroundColor'],
            }
          : null,
        milestone: milestones
          ? {
              id: milestones.id as Milestone['id'],
              title: milestones.title as Milestone['title'],
            }
          : null,
        comments: comments
          ? comments.map((comment) => ({
              id: comment.id as Comment['id'],
              contents: comment.contents as Comment['contents'],
              createdAt: new Date(comment.created_at) as Comment['createdAt'],
              author: {
                id: comment.users.id as User['id'],
                avatar: comment.users.raw_user_meta_data
                  .avatar as User['avatar'],
                nickname: comment.users.raw_user_meta_data
                  .nickname as User['nickname'],
              },
            }))
          : null,
      },
    };
  }

  private mapIssueSummary(entity: IssueSummaryEntity): IssuesSummary {
    const { data, openIssueCount, closeIssueCount } = entity;

    return {
      data: data.map(
        ({ id, title, created_at, is_open, labels, milestones, users }) => {
          return {
            id: id as Issue['id'],
            title: title as Issue['title'],
            isOpen: is_open as Issue['isOpen'],
            createdAt: new Date(created_at) as Issue['createdAt'],
            label: labels
              ? {
                  id: labels.id as Label['id'],
                  title: labels.title as Label['title'],
                  textColor: labels.text_color as Label['textColor'],
                  backgroundColor:
                    labels.background_color as Label['backgroundColor'],
                }
              : null,
            milestone: milestones
              ? {
                  id: milestones.id as Milestone['id'],
                  title: milestones.title as Milestone['title'],
                }
              : null,
            author: {
              id: users.id as User['id'],
              avatar: users.raw_user_meta_data.avatar as User['avatar'],
              nickname: users.raw_user_meta_data.nickname as User['nickname'],
            },
          };
        }
      ),
      openIssueCount,
      closeIssueCount,
    };
  }
}
