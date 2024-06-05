import { Label } from '@/model/label/label';

export interface LabelsResponse {
  data: Pick<
    Label,
    | 'id'
    | 'title'
    | 'textColor'
    | 'backgroundColor'
    | 'description'
    | 'createdAt'
  >[];
}
