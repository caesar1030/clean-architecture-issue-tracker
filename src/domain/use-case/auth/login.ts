import { inject, injectable } from 'inversify';
import type { AuthRepository } from '../../repository/auth-repository';
import { TYPES } from '../../../di/types';
import { LoginPayload } from '../../model/user/payload';
import { UserResponse } from '../../model/user/response';

export interface LoginUseCase {
  invoke: (loginPayload: LoginPayload) => Promise<UserResponse>;
}

@injectable()
export class Login implements LoginUseCase {
  private _authRepo: AuthRepository;

  constructor(@inject(TYPES.AuthRepository) authRepo: AuthRepository) {
    this._authRepo = authRepo;
  }

  async invoke(loginPayload: LoginPayload) {
    return this._authRepo.login(loginPayload);
  }
}
