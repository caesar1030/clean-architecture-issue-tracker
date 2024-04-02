import { EditLabelPayload } from '../model/label/payload';
import { LabelsResponse } from '../model/label/response';

export interface LabelRepository {
  getLabels(): Promise<LabelsResponse>;
  editLabel(editLabelPayload: EditLabelPayload): Promise<void>;
}
