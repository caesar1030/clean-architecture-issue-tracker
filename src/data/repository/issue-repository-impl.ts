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
      },
    } = entity;

    return {
      data: {
        id,
        contents,
        title,
        createdAt: new Date(created_at),
        isOpen: is_open,
        label: labels,
        milestone: milestones,
        comments,
      },
    } as IssueDetail;
  }

  private mapIssueSummary(entity: IssueSummaryEntity): IssuesSummary {
    const { data, openIssueCount, closeIssueCount } = entity;

    return {
      data: data.map(
        ({ id, title, created_at, is_open, labels, milestones }) => {
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
              ? { id: milestones.id, title: milestones.title }
              : null,
          };
        }
      ),
      openIssueCount,
      closeIssueCount,
    } as IssuesSummary;
  }
}
