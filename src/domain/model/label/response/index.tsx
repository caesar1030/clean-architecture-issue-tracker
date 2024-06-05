import { Label } from '@/domain/model/label/label';

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
