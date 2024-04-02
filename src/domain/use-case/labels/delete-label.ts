import { inject, injectable } from 'inversify';

import { TYPES } from '../../../di/types';
import { DeleteLabelPayload } from '../../model/label/payload';
import type { LabelRepository } from '../../repository/label-repository';

export interface DeleteLabelUseCase {
  invoke: (deleteLabelPayload: DeleteLabelPayload) => Promise<void>;
}

@injectable()
export class DeleteLabel implements DeleteLabelUseCase {
  private _labelRepo: LabelRepository;

  constructor(@inject(TYPES.LabelRepository) labelRepo: LabelRepository) {
    this._labelRepo = labelRepo;
  }

  async invoke(deleteIssuePayload: DeleteLabelPayload) {
    return this._labelRepo.deleteLabel(deleteIssuePayload);
  }
}
