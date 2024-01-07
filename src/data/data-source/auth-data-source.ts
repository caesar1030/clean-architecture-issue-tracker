import { LoginData, SignupData } from '../../domain/repository/auth-repository';
import { UserEntity } from '../entity/user-api-entity';

export default interface AuthDataSource {
  signup(signupData: SignupData): Promise<UserEntity>;
  login(loginData: LoginData): Promise<UserEntity>;
  logout(): Promise<void>;
  getUser(): Promise<UserEntity>;
}
