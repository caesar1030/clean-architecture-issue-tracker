import {
  CreateLabelPayload,
  DeleteLabelPayload,
  EditLabelPayload,
} from '@/domain/model/label/payload';
import { LabelsResponse } from '@/domain/model/label/response';

export default interface LabelClientService {
  getLabels(): Promise<LabelsResponse>;
  createLabel(createLabelPayload: CreateLabelPayload): Promise<void>;
  editLabel(editLabelPayload: EditLabelPayload): Promise<void>;
  deleteLabel(deleteLabelPayload: DeleteLabelPayload): Promise<void>;
}
