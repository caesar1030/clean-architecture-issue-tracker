import { inject, injectable } from 'inversify';
import { CreateMilestonePayload } from '../../model/milestone/payload';
import type { MilestoneRepository } from '../../repository/milestone-repository';
import { TYPES } from '../../../di/types';

export interface CreateMilestoneUseCase {
  invoke: (createMilestonePayload: CreateMilestonePayload) => Promise<void>;
}

@injectable()
export class CreateMilestone implements CreateMilestoneUseCase {
  private _milestoneRepo: MilestoneRepository;

  constructor(
    @inject(TYPES.MilestoneRepository) milestoneRepo: MilestoneRepository
  ) {
    this._milestoneRepo = milestoneRepo;
  }

  async invoke(createMilestonePayload: CreateMilestonePayload) {
    return this._milestoneRepo.createMilestone(createMilestonePayload);
  }
}
