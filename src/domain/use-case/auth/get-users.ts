import { inject, injectable } from 'inversify';
import { TYPES } from '../../../di/types';
import type { AuthRepository } from '../../repository/auth-repository';
import { UsersResponse } from '../../model/user/response';

export interface GetUsersUseCase {
  invoke: () => Promise<UsersResponse>;
}

@injectable()
export class GetUsers implements GetUsersUseCase {
  private _authRepo: AuthRepository;

  constructor(@inject(TYPES.AuthRepository) authRepo: AuthRepository) {
    this._authRepo = authRepo;
  }

  async invoke() {
    return this._authRepo.getUsers();
  }
}
