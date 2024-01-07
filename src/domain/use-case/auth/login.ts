import { inject, injectable } from 'inversify';
import type {
  AuthRepository,
  LoginData,
} from '../../repository/auth-repository';
import { TYPES } from '../../../di/types';
import { User } from '../../model/user';

export interface LoginUseCase {
  invoke: (loginData: LoginData) => Promise<User>;
}

@injectable()
export class Login implements LoginUseCase {
  private _authRepo: AuthRepository;

  constructor(@inject(TYPES.AuthRepository) authRepo: AuthRepository) {
    this._authRepo = authRepo;
  }

  async invoke(loginData: LoginData) {
    return this._authRepo.login(loginData);
  }
}
