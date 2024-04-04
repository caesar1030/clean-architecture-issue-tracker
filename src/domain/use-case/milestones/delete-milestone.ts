import { inject, injectable } from 'inversify';
import { DeleteMilestonePayload } from '../../model/milestone/payload';
import type { MilestoneRepository } from '../../repository/milestone-repository';
import { TYPES } from '../../../di/types';

export interface DeleteMilestoneUseCase {
  invoke: (deleteMilestonePayload: DeleteMilestonePayload) => Promise<void>;
}

@injectable()
export class DeleteMilestone implements DeleteMilestoneUseCase {
  private _milestoneRepo: MilestoneRepository;

  constructor(
    @inject(TYPES.MilestoneRepository) milestoneRepo: MilestoneRepository
  ) {
    this._milestoneRepo = milestoneRepo;
  }

  async invoke(deleteMilestonePayload: DeleteMilestonePayload) {
    return this._milestoneRepo.deleteMilestone(deleteMilestonePayload);
  }
}
