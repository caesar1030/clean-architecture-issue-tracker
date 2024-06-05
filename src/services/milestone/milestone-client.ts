import supabase from '@/data/supabase-db/supabase';
import {
  CreateMilestonePayload,
  DeleteMilestonePayload,
  EditMilestonePayload,
} from '@/model/milestone/payload';
import { MilestoneAPIEntity } from '@/data/entity/milestone-api-entity';
import { MilestonesResopnse } from '@/model/milestone/response';
import MilestoneClientService from '@/services/milestone/milestone-client-service';

export default class MilestoneClient implements MilestoneClientService {
  async getMilestones() {
    const { data, error } = await supabase
      .from('milestones')
      .select('id, title, description, due_date, is_open')
      .order('created_at', { ascending: true });

    if (error) throw new Error('마일스톤을 불러오지 못했습니다.');

    return this.mapEntityToModel({ data });
  }

  async createMilestone(
    createMilestonePayload: CreateMilestonePayload
  ): Promise<void> {
    const { title, date, description } = createMilestonePayload;

    const toCreate: {
      title: string;
      description?: string;
      due_date?: string;
    } = {
      title,
    };
    if (date) toCreate.due_date = date.toISOString();
    if (description) toCreate.description = description;

    const { error } = await supabase.from('milestones').insert(toCreate);

    if (error) throw new Error(error.message);
  }

  async deleteMilestone(
    deleteMilestonePayload: DeleteMilestonePayload
  ): Promise<void> {
    const { id } = deleteMilestonePayload;
    const { error } = await supabase.from('milestones').delete().eq('id', id);

    if (error) throw new Error(error.message);
  }

  async editMilestone({
    id,
    date,
    description,
    title,
    isOpen,
  }: EditMilestonePayload): Promise<void> {
    const toUpdate: {
      title?: string;
      description?: string;
      due_date?: string;
      is_open?: boolean;
    } = {};

    if (title) toUpdate.title = title;
    if (description) toUpdate.description = description;
    if (date) toUpdate.due_date = date.toISOString();
    if (isOpen !== undefined) toUpdate.is_open = isOpen;

    const { error } = await supabase
      .from('milestones')
      .update(toUpdate)
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  private mapEntityToModel(data: MilestoneAPIEntity): MilestonesResopnse {
    return {
      data: data.data.map(({ id, title, description, due_date, is_open }) => {
        return {
          id,
          title,
          description,
          dueDate: due_date ? new Date(due_date) : null,
          isOpen: is_open,
        };
      }),
    };
  }
}
