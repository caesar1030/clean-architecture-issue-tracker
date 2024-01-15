import { injectable } from 'inversify';
import supabase from './supabase-db/supabase';
import AuthDataSource from '../auth-data-source';
import {
  LoginData,
  SignupData,
} from '../../../domain/repository/auth-repository';
import { UserEntity } from '../../entity/user-api-entity';

@injectable()
export default class AuthDataSourceImpl implements AuthDataSource {
  async signup({ email, password, nickname }: SignupData): Promise<UserEntity> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname },
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('?');

    return {
      data: {
        user: {
          id: data.user.id,
          role: data.user.role,
          user_metadata: {
            avatar: data.user.user_metadata.avatar,
            nickname: data.user.user_metadata.nickname,
          },
        },
      },
    };
  }
  async login({ email, password }: LoginData): Promise<UserEntity> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return {
      data: {
        user: {
          id: data.user.id,
          role: data.user.role,
          user_metadata: {
            avatar: data.user.user_metadata.avatar,
            nickname: data.user.user_metadata.nickname,
          },
        },
      },
    };
  }

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
  }

  async getUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) throw new Error('로그인 필요');

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) throw new Error('로그인 필요');

    return {
      data: {
        user: {
          id: user.id,
          role: user.role,
          user_metadata: {
            avatar: user.user_metadata.avatar,
            nickname: user.user_metadata.nickname,
          },
        },
      },
    };
  }
}
