import {
  CreateMilestonePayload,
  DeleteMilestonePayload,
  EditMilestonePayload,
} from '../../domain/model/milestone/payload';
import { MilestoneAPIEntity } from '../entity/milestone-api-entity';

export default interface MilestoneDataSource {
  getMilestones(): Promise<MilestoneAPIEntity>;
  createMilestone(
    createMilestonePayload: CreateMilestonePayload
  ): Promise<void>;
  deleteMilestone(
    deleteMilestonePayload: DeleteMilestonePayload
  ): Promise<void>;
  editMilestone(editMilestonesPayload: EditMilestonePayload): Promise<void>;
}
