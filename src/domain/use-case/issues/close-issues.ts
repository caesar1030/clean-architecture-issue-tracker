import { inject, injectable } from 'inversify';
import type { IssueRepository } from '../../repository/issue-repository';
import { TYPES } from '../../../di/types';
import { CloseIssuesPayload } from '../../model/issue/payload';

export interface CloseIssuesUseCase {
  invoke: (closeIssuesPayload: CloseIssuesPayload) => Promise<void>;
}

@injectable()
export class CloseIssues implements CloseIssuesUseCase {
  private _issueRepo: IssueRepository;

  constructor(@inject(TYPES.IssueRepository) issueRepo: IssueRepository) {
    this._issueRepo = issueRepo;
  }

  async invoke(closeIssuesPayload: CloseIssuesPayload) {
    return this._issueRepo.closeIssues(closeIssuesPayload);
  }
}
