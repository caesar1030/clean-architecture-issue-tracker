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
  async signup({ email, password }: SignupData) {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw new Error(error.message);

    return {
      data: {
        user: {
          id: data.user?.id || null,
          role: data.user?.role,
        },
      },
    };
  }
  async login({ email, password }: LoginData) {
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
    if (!session.session)
      return {
        data: {
          user: null,
        },
      };

    const { data: user, error } = await supabase.auth.getUser();
    if (!user.user?.id || error) throw new Error('로그인에 실패했습니다');

    return {
      data: {
        user: { id: user.user.id, role: user.user.role },
      },
    } as UserEntity;
  }
}
