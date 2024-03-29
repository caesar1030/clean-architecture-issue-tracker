import {
  CloseIssuesPayload,
  CreateIssuePayload,
  DeleteIssuePayload,
  EditIssuePayload,
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
  deleteIssue(deleteIssuePayload: DeleteIssuePayload): Promise<void>;
  editIssue(editIssuePayload: EditIssuePayload): Promise<void>;
}
