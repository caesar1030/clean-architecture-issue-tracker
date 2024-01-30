import { LabelsResponse } from '../model/label/response';

export interface LabelRepository {
  getLabels(): Promise<LabelsResponse>;
}
