import { inject, injectable } from 'inversify';
import { EditLabelPayload } from '../../model/label/payload';
import type { LabelRepository } from '../../repository/label-repository';
import { TYPES } from '../../../di/types';

export interface EditLabelUseCase {
  invoke: (editLabelPayload: EditLabelPayload) => Promise<void>;
}

@injectable()
export class EditLabel implements EditLabelUseCase {
  private _labelRepo: LabelRepository;

  constructor(@inject(TYPES.LabelRepository) labelRepo: LabelRepository) {
    this._labelRepo = labelRepo;
  }

  async invoke(editLabelPayload: EditLabelPayload) {
    return this._labelRepo.editLabel(editLabelPayload);
  }
}
