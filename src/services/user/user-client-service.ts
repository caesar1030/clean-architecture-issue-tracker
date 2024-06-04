import { LoginPayload, SignupPayload } from '@/domain/model/user/payload';
import { UserResponse, UsersResponse } from '@/domain/model/user/response';

export default interface UserClientService {
  signup(signupPayload: SignupPayload): Promise<UserResponse>;
  login(loginPayload: LoginPayload): Promise<UserResponse>;
  logout(): Promise<void>;
  getUser(): Promise<UserResponse>;
  getUsers(): Promise<UsersResponse>;
}
