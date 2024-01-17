import { inject, injectable } from 'inversify';
import { AuthRepository } from '../../domain/repository/auth-repository';
import { TYPES } from '../../di/types';
import type AuthDataSource from '../data-source/auth-data-source';
import { UserEntity, UsersEntity } from '../entity/user-api-entity';
import { User } from '../../domain/model/user/user';
import { UserResponse, UsersResponse } from '../../domain/model/user/response';
import { LoginPayload, SignupPayload } from '../../domain/model/user/payload';

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  private _datasource: AuthDataSource;

  constructor(@inject(TYPES.AuthDataSource) dataSource: AuthDataSource) {
    this._datasource = dataSource;
  }

  async signup(signupPayload: SignupPayload): Promise<UserResponse> {
    const data = await this._datasource.signup(signupPayload);
    return this.mapUser(data);
  }

  async login(loginPayload: LoginPayload) {
    const data = await this._datasource.login(loginPayload);
    return this.mapUser(data);
  }

  async logout() {
    return this._datasource.logout();
  }

  async getUser(): Promise<UserResponse> {
    const data = await this._datasource.getUser();
    return this.mapUser(data);
  }

  async getUsers(): Promise<UsersResponse> {
    const data = await this._datasource.getUsers();

    return this.mapUsers(data);
  }

  private mapUser(userEntity: UserEntity): UserResponse {
    const { data: user } = userEntity;

    return {
      data: {
        id: user.id as User['id'],
        role: user.role as User['role'],
        avatar: user.user_metadata.avatar as User['avatar'],
        nickname: user.user_metadata.nickname as User['nickname'],
      },
    };
  }

  private mapUsers(usersEntity: UsersEntity): UsersResponse {
    const { data } = usersEntity;

    return {
      data: data.map(({ id, raw_user_meta_data: { nickname, avatar } }) => ({
        id: id as User['id'],
        avatar: avatar as User['avatar'],
        nickname: nickname as User['nickname'],
      })),
    };
  }
}
