import { inject, injectable } from 'inversify';
import { DeleteMilestonePayload as EditMilestonePayload } from '../../model/milestone/payload';
import type { MilestoneRepository } from '../../repository/milestone-repository';
import { TYPES } from '../../../di/types';

export interface EditMilestoneUseCase {
  invoke: (editMilestonePayload: EditMilestonePayload) => Promise<void>;
}

@injectable()
export class EditMilestone implements EditMilestoneUseCase {
  private _milestoneRepo: MilestoneRepository;

  constructor(
    @inject(TYPES.MilestoneRepository) milestoneRepo: MilestoneRepository
  ) {
    this._milestoneRepo = milestoneRepo;
  }

  async invoke(editMilestonePayload: EditMilestonePayload) {
    return this._milestoneRepo.editMilestone(editMilestonePayload);
  }
}
