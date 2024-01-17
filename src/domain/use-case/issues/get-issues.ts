import { inject, injectable } from 'inversify';
import type { IssueRepository } from '../../repository/issue-repository';
import { TYPES } from '../../../di/types';
import { IssuesFilterPayload } from '../../model/issue/payload';
import { IssuesResponse } from '../../model/issue/response';

export interface GetIssuesUseCase {
  invoke: (issuesFilterPayload: IssuesFilterPayload) => Promise<IssuesResponse>;
}

@injectable()
export class GetIssues implements GetIssuesUseCase {
  private _issueRepo: IssueRepository;

  constructor(@inject(TYPES.IssueRepository) issueRepo: IssueRepository) {
    this._issueRepo = issueRepo;
  }

  async invoke(issuesFilterPayload: IssuesFilterPayload) {
    return this._issueRepo.getIssues(issuesFilterPayload);
  }
}
