import { inject, injectable } from 'inversify';
import type {
  AuthRepository,
  SignupData,
} from '../../repository/auth-repository';
import { TYPES } from '../../../di/types';
import { User } from '../../model/user';

export interface SignupUseCase {
  invoke: (signupData: SignupData) => Promise<User>;
}

@injectable()
export class Signup implements SignupUseCase {
  private _authRepo: AuthRepository;

  constructor(@inject(TYPES.AuthRepository) authRepo: AuthRepository) {
    this._authRepo = authRepo;
  }

  async invoke(signupData: SignupData) {
    return this._authRepo.signup(signupData);
  }
}
