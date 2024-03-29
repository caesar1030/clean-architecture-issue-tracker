import { inject, injectable } from 'inversify';
import { LabelRepository } from '../../domain/repository/label-repository';
import { LabelAPIEntity } from '../entity/label-api-entity';
import type LabelDataSource from '../data-source/label-data-source';
import { TYPES } from '../../di/types';
import { LabelsResponse } from '../../domain/model/label/response';
import { Label } from '../../domain/model/label/label';

@injectable()
export class LabelRepositoryImpl implements LabelRepository {
  private _datasource: LabelDataSource;

  constructor(@inject(TYPES.LabelDataSource) dataSource: LabelDataSource) {
    this._datasource = dataSource;
  }

  async getLabels(): Promise<LabelsResponse> {
    const data = await this._datasource.getLabels();

    return this.mapEntityToModel(data);
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
            id: id as Label['id'],
            title: title as Label['title'],
            description: description as Label['description'],
            textColor: text_color as Label['textColor'],
            backgroundColor: background_color as Label['backgroundColor'],
            createdAt: created_at as Label['createdAt'],
          };
        }
      ),
    };
  }
}
