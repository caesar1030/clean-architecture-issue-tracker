import { inject, injectable } from 'inversify';
import type { IssueRepository } from '../../repository/issue-repository';
import { TYPES } from '../../../di/types';
import { IssueResponse } from '../../model/issue/response';
import { GetIssuePayload } from '../../model/issue/payload';

export interface GetIssueUseCase {
  invoke: (getIssuePayload: GetIssuePayload) => Promise<IssueResponse>;
}

@injectable()
export class GetIssue implements GetIssueUseCase {
  private _issueRepo: IssueRepository;

  constructor(@inject(TYPES.IssueRepository) issueRepo: IssueRepository) {
    this._issueRepo = issueRepo;
  }

  async invoke(getIssuePayload: GetIssuePayload) {
    return this._issueRepo.getIssue(getIssuePayload);
  }
}
