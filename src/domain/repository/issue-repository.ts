import {
  CloseIssuesPayload,
  CreateIssuePayload,
  EditIssueTitlePayload,
  GetIssuePayload,
  IssuesFilterPayload,
  OpenIssuesPayload,
} from '../model/issue/payload';
import { IssueResponse, IssuesResponse } from '../model/issue/response';

export interface IssueRepository {
  getIssue(getIssuePayload: GetIssuePayload): Promise<IssueResponse>;
  getIssues(issuesFilterPayload: IssuesFilterPayload): Promise<IssuesResponse>;
  openIssues(openIssuesPayload: OpenIssuesPayload): Promise<void>;
  closeIssues(closeIssuesPayload: CloseIssuesPayload): Promise<void>;
  createIssue(createIssuePayload: CreateIssuePayload): Promise<void>;
  editTitle(editIssueTitlePayload: EditIssueTitlePayload): Promise<void>;
}
