import { EditLabelPayload } from '../../domain/model/label/payload';
import { LabelAPIEntity } from '../entity/label-api-entity';

export default interface LabelDataSource {
  getLabels(): Promise<LabelAPIEntity>;
  editLabel(editLabelPayload: EditLabelPayload): Promise<void>;
}
