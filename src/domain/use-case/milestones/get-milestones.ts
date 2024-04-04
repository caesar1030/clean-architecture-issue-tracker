import { inject, injectable } from 'inversify';
import type { MilestoneRepository } from '../../repository/milestone-repository';
import { TYPES } from '../../../di/types';
import { MilestonesResopnse } from '../../model/milestone/response';

export interface GetMilestonesUseCase {
  invoke: () => Promise<MilestonesResopnse>;
}

@injectable()
export class GetMilestones implements GetMilestonesUseCase {
  private _milestoneRepo: MilestoneRepository;
  constructor(
    @inject(TYPES.MilestoneRepository) milestoneRepo: MilestoneRepository
  ) {
    this._milestoneRepo = milestoneRepo;
  }

  async invoke() {
    return this._milestoneRepo.getMilestones();
  }
}
