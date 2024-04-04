import { CreateMilestonePayload } from '../../domain/model/milestone/payload';
import { MilestoneAPIEntity } from '../entity/milestone-api-entity';

export default interface MilestoneDataSource {
  getMilestones(): Promise<MilestoneAPIEntity>;
  createMilestone(
    createMilestonePayload: CreateMilestonePayload
  ): Promise<void>;
}
