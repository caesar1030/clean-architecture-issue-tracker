export interface MilestoneAPIEntity {
  data: {
    id: number;
    title: string;
    description: string | null;
    due_date: string | null;
    is_open: boolean;
  }[];
}
