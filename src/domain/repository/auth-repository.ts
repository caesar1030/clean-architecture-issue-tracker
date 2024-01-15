import { User } from '../model/user';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  nickname: string;
}

export interface AuthRepository {
  signup(signupData: SignupData): Promise<User>;
  login(loginData: LoginData): Promise<User>;
  logout(): Promise<void>;
  getUser(): Promise<User>;
}
