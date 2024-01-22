import { inject, injectable } from 'inversify';
import { Issue } from '../../domain/model/issue/issue';
import { IssueRepository } from '../../domain/repository/issue-repository';
import { IssueEntity, IssuesEntity } from '../entity/issue-api-entity';
import type IssueDataSource from '../data-source/issue-data-source';
import { TYPES } from '../../di/types';
import { Label } from '../../domain/model/label/label';
import { Milestone } from '../../domain/model/milestone/milestone';
import { User } from '../../domain/model/user/user';
import { Comment } from '../../domain/model/comment/comment';
import {
  CloseIssuesPayload,
  CreateIssuePayload,
  DeleteIssuePayload,
  EditIssuePayload,
  GetIssuePayload,
  IssuesFilterPayload,
  OpenIssuesPayload,
} from '../../domain/model/issue/payload';
import {
  IssueResponse,
  IssuesResponse,
} from '../../domain/model/issue/response';

@injectable()
export class IssueRepositoryImpl implements IssueRepository {
  private _datasource: IssueDataSource;

  constructor(@inject(TYPES.IssueDataSource) dataSource: IssueDataSource) {
    this._datasource = dataSource;
  }
  async getIssue(getIssuePayload: GetIssuePayload): Promise<IssueResponse> {
    const entity = await this._datasource.getIssue(getIssuePayload);

    return this.mapIssue(entity);
  }

  async getIssues(
    issuesFilterPayload: IssuesFilterPayload
  ): Promise<IssuesResponse> {
    const entity = await this._datasource.getIssues(issuesFilterPayload);

    return this.mapIssues(entity);
  }

  async openIssues(openIssuesPayload: OpenIssuesPayload): Promise<void> {
    return this._datasource.openIssues(openIssuesPayload);
  }

  async closeIssues(closeIssuesPayload: CloseIssuesPayload): Promise<void> {
    return this._datasource.closeIssues(closeIssuesPayload);
  }

  async createIssue(createIssuePayload: CreateIssuePayload): Promise<void> {
    return this._datasource.createIssue(createIssuePayload);
  }
  async deleteIssue(deleteIssuePayload: DeleteIssuePayload): Promise<void> {
    return this._datasource.deleteIssue(deleteIssuePayload);
  }

  async editIssue(editIssuePayload: EditIssuePayload): Promise<void> {
    return this._datasource.editIssue(editIssuePayload);
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
        id: id as Issue['id'],
        contents: contents as Issue['contents'],
        title: title as Issue['title'],
        createdAt: new Date(created_at) as Issue['createdAt'],
        isOpen: is_open as Issue['isOpen'],
        author: {
          id: author.id as User['id'],
          avatar: author.raw_user_meta_data.avatar as User['avatar'],
          nickname: author.raw_user_meta_data.nickname as User['nickname'],
        },
        assignee: {
          id: assignee?.id as User['id'],
          avatar: assignee?.raw_user_meta_data.avatar as User['avatar'],
          nickname: assignee?.raw_user_meta_data.nickname as User['nickname'],
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
                id: comment.author.id as User['id'],
                avatar: comment.author.raw_user_meta_data
                  .avatar as User['avatar'],
                nickname: comment.author.raw_user_meta_data
                  .nickname as User['nickname'],
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
              id: author.id as User['id'],
              avatar: author.raw_user_meta_data.avatar as User['avatar'],
              nickname: author.raw_user_meta_data.nickname as User['nickname'],
            },
            assignee: {
              id: assignee?.id as User['id'],
              avatar: assignee?.raw_user_meta_data.avatar as User['avatar'],
              nickname: author.raw_user_meta_data.nickname as User['nickname'],
            },
          };
        }
      ),
      openIssueCount,
      closeIssueCount,
    };
  }
}
