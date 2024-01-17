import { Label } from '../model/label/label';

export interface Labels {
  data: Label[];
}
export interface LabelRepository {
  getLabels(): Promise<Labels>;
}
