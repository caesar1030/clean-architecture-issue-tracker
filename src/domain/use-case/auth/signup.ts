import { inject, injectable } from 'inversify';
import type { AuthRepository } from '../../repository/auth-repository';
import { TYPES } from '../../../di/types';
import { UserResponse } from '../../model/user/response';
import { SignupPayload } from '../../model/user/payload';

export interface SignupUseCase {
  invoke: (signupPayload: SignupPayload) => Promise<UserResponse>;
}

@injectable()
export class Signup implements SignupUseCase {
  private _authRepo: AuthRepository;

  constructor(@inject(TYPES.AuthRepository) authRepo: AuthRepository) {
    this._authRepo = authRepo;
  }

  async invoke(signupPayload: SignupPayload) {
    return this._authRepo.signup(signupPayload);
  }
}
