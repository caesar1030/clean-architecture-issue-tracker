import { inject, injectable } from 'inversify';
import type { AuthRepository } from '../../repository/auth-repository';
import { TYPES } from '../../../di/types';

export interface LogoutUseCase {
  invoke: () => Promise<void>;
}

@injectable()
export class Logout implements LogoutUseCase {
  private _authRepo: AuthRepository;

  constructor(@inject(TYPES.AuthRepository) authRepo: AuthRepository) {
    this._authRepo = authRepo;
  }

  async invoke() {
    return this._authRepo.logout();
  }
}
