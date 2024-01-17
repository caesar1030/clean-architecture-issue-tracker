import { LoginPayload, SignupPayload } from '../model/user/payload';
import { UserResponse, UsersResponse } from '../model/user/response';

export interface AuthRepository {
  signup(signupPayload: SignupPayload): Promise<UserResponse>;
  login(loginPayload: LoginPayload): Promise<UserResponse>;
  logout(): Promise<void>;
  getUser(): Promise<UserResponse>;
  getUsers(): Promise<UsersResponse>;
}
