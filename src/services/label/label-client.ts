import { LabelsResponse } from '@/model/label/response';
import supabase from '@/data/supabase-db/supabase';
import {
  CreateLabelPayload,
  DeleteLabelPayload,
  EditLabelPayload,
} from '@/model/label/payload';
import { LabelAPIEntity } from '@/data/entity/label-api-entity';
import LabelClientService from '@/services/label/label-client-service';

export default class LabelClient implements LabelClientService {
  async getLabels(): Promise<LabelsResponse> {
    const { data, error } = await supabase
      .from('labels')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw new Error('라벨을 불러오지 못했습니다.');

    return this.mapEntityToModel({ data });
  }

  async createLabel(createLabelPayload: CreateLabelPayload): Promise<void> {
    const { backgroundColor, description, title } = createLabelPayload;

    const toCreate = {
      title,
      description,
      text_color: '#FFFFFF',
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

  private mapEntityToModel(entity: LabelAPIEntity): LabelsResponse {
    const { data } = entity;

    return {
      data: data.map(
        ({
          id,
          title,
          description,
          text_color,
          background_color,
          created_at,
        }) => {
          return {
            id,
            title,
            description,
            textColor: text_color,
            backgroundColor: background_color,
            createdAt: created_at,
          };
        }
      ),
    };
  }
}
