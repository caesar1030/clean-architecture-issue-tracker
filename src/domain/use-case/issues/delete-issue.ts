import { inject, injectable } from 'inversify';

import type { IssueRepository } from '../../repository/issue-repository';
import { TYPES } from '../../../di/types';
import { DeleteIssuePayload } from '../../model/issue/payload';

export interface DeleteIssueUseCase {
  invoke: (deleteIssuePayload: DeleteIssuePayload) => Promise<void>;
}

@injectable()
export class DeleteIssue implements DeleteIssueUseCase {
  private _issueRepo: IssueRepository;

  constructor(@inject(TYPES.IssueRepository) issueRepo: IssueRepository) {
    this._issueRepo = issueRepo;
  }

  async invoke(deleteIssuePayload: DeleteIssuePayload) {
    return this._issueRepo.deleteIssue(deleteIssuePayload);
  }
}
