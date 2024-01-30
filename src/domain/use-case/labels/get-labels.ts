import { inject, injectable } from 'inversify';
import type { LabelRepository } from '../../repository/label-repository';
import { TYPES } from '../../../di/types';
import { LabelsResponse } from '../../model/label/response';

export interface GetLabelsUseCase {
  invoke: () => Promise<LabelsResponse>;
}

@injectable()
export class GetLabels implements GetLabelsUseCase {
  private _labelRepo: LabelRepository;

  constructor(@inject(TYPES.LabelRepository) labelRepo: LabelRepository) {
    this._labelRepo = labelRepo;
  }

  async invoke() {
    return this._labelRepo.getLabels();
  }
}
