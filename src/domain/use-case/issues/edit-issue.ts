import { inject, injectable } from 'inversify';
import { EditIssuePayload } from '../../model/issue/payload';
import type { IssueRepository } from '../../repository/issue-repository';
import { TYPES } from '../../../di/types';

export interface EditIssueUseCase {
  invoke: (editIssuePayload: EditIssuePayload) => Promise<void>;
}

@injectable()
export class EditIssue implements EditIssueUseCase {
  private _issueRepo: IssueRepository;

  constructor(@inject(TYPES.IssueRepository) issueRepo: IssueRepository) {
    this._issueRepo = issueRepo;
  }

  async invoke(editIssuePayload: EditIssuePayload) {
    return this._issueRepo.editIssue(editIssuePayload);
  }
}
