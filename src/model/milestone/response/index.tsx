import { Milestone } from '@/model/milestone/milestone';

export interface MilestonesResopnse {
  data: (Pick<Milestone, 'id' | 'isOpen' | 'title'> & {
    description: Milestone['description'] | null;
    dueDate: Milestone['dueDate'];
  })[];
}
