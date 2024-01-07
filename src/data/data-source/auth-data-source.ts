import { LoginData } from '../../domain/repository/auth-repository';
import { UserEntity } from '../entity/user-api-entity';

export default interface AuthDataSource {
  login(loginData: LoginData): Promise<UserEntity>;
  getUser(): Promise<UserEntity>;
}
