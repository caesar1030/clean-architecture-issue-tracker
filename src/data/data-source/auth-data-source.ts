import { LoginPayload, SignupPayload } from '../../domain/model/user/payload';
import { UserEntity, UsersEntity } from '../entity/user-api-entity';

export default interface AuthDataSource {
  signup(signupPayload: SignupPayload): Promise<UserEntity>;
  login(loginPayload: LoginPayload): Promise<UserEntity>;
  logout(): Promise<void>;
  getUser(): Promise<UserEntity>;
  getUsers(): Promise<UsersEntity>;
}
