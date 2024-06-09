import { Label } from '@/services/label/label';

export interface CreateLabelPayload {
  title: string;
  description: string;
  textColor: string;
  backgroundColor: string;
}
export interface EditLabelPayload {
  id: Label['id'];
  title: string;
  description: string;
  textColor: string;
  backgroundColor: string;
}

export interface DeleteLabelPayload {
  id: Label['id'];
}
