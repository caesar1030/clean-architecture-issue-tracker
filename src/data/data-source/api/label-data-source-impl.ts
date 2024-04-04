import { injectable } from 'inversify';
import LabelDataSource from '../label-data-source';
import { LabelAPIEntity } from '../../entity/label-api-entity';
import supabase from './supabase-db/supabase';
import {
  CreateLabelPayload,
  DeleteLabelPayload,
  EditLabelPayload,
} from '../../../domain/model/label/payload';

@injectable()
export default class LabelDataSourceImpl implements LabelDataSource {
  async getLabels(): Promise<LabelAPIEntity> {
    const { data, error } = await supabase
      .from('labels')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw new Error('라벨을 불러오지 못했습니다.');

    return { data };
  }

  async createLabel(createLabelPayload: CreateLabelPayload): Promise<void> {
    const { backgroundColor, description, textColor, title } =
      createLabelPayload;

    const toCreate = {
      title,
      description,
      text_color: textColor,
      background_color: backgroundColor,
    };

    const { error } = await supabase.from('labels').insert(toCreate);

    if (error) throw new Error(error.message);
  }

  async editLabel(editLabelPayload: EditLabelPayload): Promise<void> {
    const { id, title, textColor, backgroundColor, description } =
      editLabelPayload;

    const toUpdate = {
      title,
      text_color: textColor,
      background_color: backgroundColor,
      description,
    };

    const { error } = await supabase
      .from('labels')
      .update(toUpdate)
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async deleteLabel(deleteLabelPayload: DeleteLabelPayload): Promise<void> {
    const { id } = deleteLabelPayload;
    const { error } = await supabase.from('labels').delete().eq('id', id);

    if (error) throw new Error(error.message);
  }
}
