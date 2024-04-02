import {
  CreateLabelPayload,
  DeleteLabelPayload,
  EditLabelPayload,
} from '../../domain/model/label/payload';
import { LabelAPIEntity } from '../entity/label-api-entity';

export default interface LabelDataSource {
  getLabels(): Promise<LabelAPIEntity>;
  createLabel(createLabelPayload: CreateLabelPayload): Promise<void>;
  editLabel(editLabelPayload: EditLabelPayload): Promise<void>;
  deleteLabel(deleteLabelPayload: DeleteLabelPayload): Promise<void>;
}
