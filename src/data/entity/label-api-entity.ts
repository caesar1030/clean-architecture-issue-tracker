export interface LabelAPIEntity {
  data: {
    id: number;
    title: string;
    description: string | null;
    text_color: string;
    background_color: string;
    created_at: string;
  }[];
}
