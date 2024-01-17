import { injectable } from 'inversify';
import supabase from './supabase-db/supabase';
import AuthDataSource from '../auth-data-source';
import { UserEntity, UsersEntity } from '../../entity/user-api-entity';
import {
  LoginPayload,
  SignupPayload,
} from '../../../domain/model/user/payload';

@injectable()
export default class AuthDataSourceImpl implements AuthDataSource {
  async signup({
    email,
    password,
    nickname,
  }: SignupPayload): Promise<UserEntity> {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname },
      },
    });

    if (error) throw new Error(error.message);
    if (!user) throw new Error('회원가입에 실패했습니다');

    return {
      data: user,
    };
  }
  async login({ email, password }: LoginPayload): Promise<UserEntity> {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!user) throw new Error('로그인에 실패했습니다');

    return {
      data: user,
    };
  }

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
  }

  async getUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) throw new Error('로그인이  필요합니다');

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) throw new Error('로그인이 필요합니다');

    return {
      data: user,
    };
  }

  async getUsers(): Promise<UsersEntity> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, raw_user_meta_data');

    if (error) throw new Error(error.message);

    return { data } as UsersEntity;
  }
}
