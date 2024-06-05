import {
  CreateLabelPayload,
  DeleteLabelPayload,
  EditLabelPayload,
} from '@/model/label/payload';
import { LabelsResponse } from '@/model/label/response';

export default interface LabelClientService {
  getLabels(): Promise<LabelsResponse>;
  createLabel(createLabelPayload: CreateLabelPayload): Promise<void>;
  editLabel(editLabelPayload: EditLabelPayload): Promise<void>;
  deleteLabel(deleteLabelPayload: DeleteLabelPayload): Promise<void>;
}
