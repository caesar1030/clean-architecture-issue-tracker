import { inject, injectable } from 'inversify';

import type { IssueRepository } from '../../repository/issue-repository';
import { TYPES } from '../../../di/types';
import { CreateIssuePayload } from '../../model/issue/payload';

export interface CreateIssueUseCase {
  invoke: (createIssuePayload: CreateIssuePayload) => Promise<void>;
}

@injectable()
export class CreateIssue implements CreateIssueUseCase {
  private _issueRepo: IssueRepository;

  constructor(@inject(TYPES.IssueRepository) issueRepo: IssueRepository) {
    this._issueRepo = issueRepo;
  }

  async invoke(createIssuePayload: CreateIssuePayload) {
    return this._issueRepo.createIssue(createIssuePayload);
  }
}
