import { inject, injectable } from 'inversify';
import { TYPES } from '../../../di/types';
import type { AuthRepository } from '../../repository/auth-repository';
import { User } from '../../model/user';

export interface GetUserUseCase {
  invoke: () => Promise<User>;
}

@injectable()
export class GetUser implements GetUserUseCase {
  private _authRepo: AuthRepository;

  constructor(@inject(TYPES.AuthRepository) authRepo: AuthRepository) {
    this._authRepo = authRepo;
  }

  async invoke() {
    return this._authRepo.getUser();
  }
}
