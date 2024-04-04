import { injectable } from 'inversify';
import MilestoneDataSource from '../milestone-data-source';
import supabase from './supabase-db/supabase';
import { CreateMilestonePayload } from '../../../domain/model/milestone/payload';

@injectable()
export default class MilestoneDataSourceImpl implements MilestoneDataSource {
  async getMilestones() {
    const { data, error } = await supabase
      .from('milestones')
      .select('id, title, description, due_date, is_open');

    if (error) throw new Error('마일스톤을 불러오지 못했습니다.');

    return { data };
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
}
