import {
  CreateMilestonePayload,
  DeleteMilestonePayload,
  EditMilestonePayload,
} from '@/domain/model/milestone/payload';
import { MilestonesResopnse } from '@/domain/model/milestone/response';

export default interface MilestoneClientService {
  getMilestones(): Promise<MilestonesResopnse>;
  createMilestone(
    createMilestonePayload: CreateMilestonePayload
  ): Promise<void>;
  deleteMilestone(
    deleteMilestonePayload: DeleteMilestonePayload
  ): Promise<void>;
  editMilestone(editMilestonesPayload: EditMilestonePayload): Promise<void>;
}
