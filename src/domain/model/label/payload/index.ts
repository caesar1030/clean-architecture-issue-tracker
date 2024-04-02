import { Label } from '../label';

export interface EditLabelPayload {
  id: Label['id'];
  title: string;
  description: string;
  textColor: string;
  backgroundColor: string;
}
