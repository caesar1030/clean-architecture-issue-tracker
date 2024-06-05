import { Milestone } from '@/model/milestone/milestone';

export interface CreateMilestonePayload {
  title: string;
  description?: string;
  date?: Date;
}

export interface DeleteMilestonePayload {
  id: Milestone['id'];
}

export interface EditMilestonePayload {
  id: Milestone['id'];
  title?: Milestone['title'];
  description?: Milestone['description'];
  date?: Milestone['dueDate'];
  isOpen?: Milestone['isOpen'];
}
