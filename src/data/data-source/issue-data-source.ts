import { Issue } from '../../domain/model/issue';

export default interface IssueDataSource {
  getIssues(): Promise<any>;
  openIssues(ids: Brand<number, Issue>[]): Promise<void>;
  closeIssues(ids: Brand<number, Issue>[]): Promise<void>;
}
