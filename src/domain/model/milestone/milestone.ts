export interface Milestone {
  id: number;
  title: string;
  description: string;
  dueDate: Date | null;
  isOpen: boolean;
  createdAt: Date;
}
