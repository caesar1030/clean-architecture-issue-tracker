import { User } from '../model/user';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthRepository {
  login(loginData: LoginData): Promise<User>;
  logout(): Promise<void>;
  getUser(): Promise<User>;
}
