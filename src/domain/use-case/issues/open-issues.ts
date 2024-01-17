import { inject, injectable } from 'inversify';
import type { IssueRepository } from '../../repository/issue-repository';
import { TYPES } from '../../../di/types';
import { OpenIssuesPayload } from '../../model/issue/payload';

export interface OpenIssuesUseCase {
  invoke: (openIssuesPayload: OpenIssuesPayload) => Promise<void>;
}

@injectable()
export class OpenIssues implements OpenIssuesUseCase {
  private _issueRepo: IssueRepository;

  constructor(@inject(TYPES.IssueRepository) issueRepo: IssueRepository) {
    this._issueRepo = issueRepo;
  }

  async invoke(openIssuesPayload: OpenIssuesPayload) {
    return this._issueRepo.openIssues(openIssuesPayload);
  }
}
