import { inject, injectable } from 'inversify';

import { TYPES } from '../../../di/types';

import type { LabelRepository } from '../../repository/label-repository';
import { CreateLabelPayload } from '../../model/label/payload';

export interface CreateLabelUseCase {
  invoke: (createLabelPayload: CreateLabelPayload) => Promise<void>;
}

@injectable()
export class CreateLabel implements CreateLabelUseCase {
  private _labelRepo: LabelRepository;

  constructor(@inject(TYPES.LabelRepository) labelRepo: LabelRepository) {
    this._labelRepo = labelRepo;
  }

  async invoke(createLabelPayload: CreateLabelPayload) {
    return this._labelRepo.createLabel(createLabelPayload);
  }
}
