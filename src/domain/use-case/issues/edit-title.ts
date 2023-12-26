import { inject, injectable } from 'inversify';

import type {
  EditTitleData,
  IssueRepository,
} from '../../repository/issue-repository';
import { TYPES } from '../../../di/types';

export interface EditTitleUseCase {
  invoke: (editTitleData: EditTitleData) => Promise<void>;
}

@injectable()
export class EditTitle implements EditTitleUseCase {
  private _issueRepo: IssueRepository;

  constructor(@inject(TYPES.IssueRepository) issueRepo: IssueRepository) {
    this._issueRepo = issueRepo;
  }

  async invoke(editTitleData: EditTitleData) {
    return this._issueRepo.editTitle(editTitleData);
  }
}
