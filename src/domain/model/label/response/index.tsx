import { Label } from '../label';

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
