import { inject, injectable } from 'inversify';
import type { IssueRepository } from '../../repository/issue-repository';
import { TYPES } from '../../../di/types';
import { EditIssueTitlePayload } from '../../model/issue/payload';

export interface EditTitleUseCase {
  invoke: (editIssueTitlePayload: EditIssueTitlePayload) => Promise<void>;
}

@injectable()
export class EditTitle implements EditTitleUseCase {
  private _issueRepo: IssueRepository;

  constructor(@inject(TYPES.IssueRepository) issueRepo: IssueRepository) {
    this._issueRepo = issueRepo;
  }

  async invoke(editIssueTitlePayload: EditIssueTitlePayload) {
    return this._issueRepo.editTitle(editIssueTitlePayload);
  }
}
