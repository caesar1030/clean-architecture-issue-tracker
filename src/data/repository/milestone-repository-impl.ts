import { inject, injectable } from 'inversify';
import { MilestoneRepository } from '../../domain/repository/milestone-repository';
import { MilestoneAPIEntity } from '../entity/milestone-api-entity';
import type MilestoneDataSource from '../data-source/milestone-data-source';
import { TYPES } from '../../di/types';
import { CreateMilestonePayload } from '../../domain/model/milestone/payload';
import { MilestonesResopnse } from '../../domain/model/milestone/response';
import { Milestone } from '../../domain/model/milestone/milestone';

@injectable()
export class MilestoneRepositoryImpl implements MilestoneRepository {
  private _datasource: MilestoneDataSource;
  constructor(
    @inject(TYPES.MilestoneDataSource) private datasource: MilestoneDataSource
  ) {
    this._datasource = datasource;
  }

  async getMilestones() {
    const data = await this.datasource.getMilestones();

    return this.mapEntityToModel(data);
  }

  async createMilestone(
    createMilestonePayload: CreateMilestonePayload
  ): Promise<void> {
    return this._datasource.createMilestone(createMilestonePayload);
  }

  private mapEntityToModel(data: MilestoneAPIEntity): MilestonesResopnse {
    return {
      data: data.data.map(({ id, title, description, due_date, is_open }) => {
        return {
          id: id as Milestone['id'],
          title: title as Milestone['title'],
          description: description as Milestone['description'],
          dueDate: (due_date
            ? new Date(due_date)
            : null) as Milestone['dueDate'],
          isOpen: is_open as Milestone['isOpen'],
        };
      }),
    };
  }
}
