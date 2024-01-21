import {
  CloseIssuesPayload,
  CreateIssuePayload,
  EditIssuePayload,
  GetIssuePayload,
  IssuesFilterPayload,
  OpenIssuesPayload,
} from '../../domain/model/issue/payload';
import { IssueEntity, IssuesEntity } from '../entity/issue-api-entity';

export default interface IssueDataSource {
  getIssue(getIssuePayload: GetIssuePayload): Promise<IssueEntity>;
  getIssues(issuesFilterPayload: IssuesFilterPayload): Promise<IssuesEntity>;
  openIssues(openIssuesPayload: OpenIssuesPayload): Promise<void>;
  closeIssues(closeIssuesPayload: CloseIssuesPayload): Promise<void>;
  createIssue(createIssuePayload: CreateIssuePayload): Promise<void>;
  editIssue(editIssuePayload: EditIssuePayload): Promise<void>;
}
