import { inject, injectable } from 'inversify';
import {
  AuthRepository,
  LoginData,
  SignupData,
} from '../../domain/repository/auth-repository';
import { TYPES } from '../../di/types';
import type AuthDataSource from '../data-source/auth-data-source';
import { UserEntity } from '../entity/user-api-entity';
import { User } from '../../domain/model/user';

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  private _datasource: AuthDataSource;

  constructor(@inject(TYPES.AuthDataSource) dataSource: AuthDataSource) {
    this._datasource = dataSource;
  }

  async signup(signupData: SignupData): Promise<User> {
    const data = await this._datasource.signup(signupData);
    return this.mapUser(data);
  }

  async login(loginData: LoginData) {
    const data = await this._datasource.login(loginData);
    return this.mapUser(data);
  }

  async logout() {
    return this._datasource.logout();
  }

  async getUser(): Promise<User> {
    const data = await this._datasource.getUser();
    return this.mapUser(data);
  }

  private mapUser(userEntity: UserEntity): User {
    const {
      data: { user },
    } = userEntity;

    return {
      id: user.id as User['id'],
      role: user.role as User['role'],
      avatar: user.user_metadata.avatar as User['avatar'],
      nickname: user.user_metadata.nickname as User['nickname'],
    };
  }
}
