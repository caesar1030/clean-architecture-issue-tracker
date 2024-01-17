import { Milestone } from '../model/milestone/milestone';

export interface Milestones {
  data: Milestone[];
}

export interface MilestoneRepository {
  getMilestones(): Promise<Milestones>;
}
