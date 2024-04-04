import { CreateMilestonePayload } from '../model/milestone/payload';
import { MilestonesResopnse } from '../model/milestone/response';

export interface MilestoneRepository {
  getMilestones(): Promise<MilestonesResopnse>;
  createMilestone(
    createMilestonePayload: CreateMilestonePayload
  ): Promise<void>;
}
