import { Issue } from '../../domain/model/issue';
import {
  EditTitleData,
  IssueCreationData,
  IssueFilterOptions,
} from '../../domain/repository/issue-repository';
import {
  IssueDetailEntity,
  IssueSummaryEntity,
} from '../entity/issue-api-entity';

export default interface IssueDataSource {
  getIssue(id: Issue['id']): Promise<IssueDetailEntity>;
  getIssues(filterOptions: IssueFilterOptions): Promise<IssueSummaryEntity>;
  openIssues(ids: Issue['id'][]): Promise<void>;
  closeIssues(ids: Issue['id'][]): Promise<void>;
  createIssue(newIssue: IssueCreationData): Promise<void>;
  editTitle(editTitleData: EditTitleData): Promise<void>;
}
