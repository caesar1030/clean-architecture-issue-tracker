import { LoginPayload, SignupPayload } from '@/services/user/payload';
import supabase from '@/data/supabase-db/supabase';
import { UserEntity, UsersEntity } from '@/data/entity/user-api-entity';
import { UserResponse, UsersResponse } from '@/services/user/response';

export default class UserService {
  async signup({
    email,
    nickname,
    password,
  }: SignupPayload): Promise<UserResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname },
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('회원가입에 실패했습니다');

    return this.mapUser({ data: data.user });
  }

  async login({ email, password }: LoginPayload): Promise<UserResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('로그인에 실패했습니다');
    return this.mapUser({ data: data.user });
  }

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
  }

  async getUser(): Promise<UserResponse> {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) throw new Error('로그인이  필요합니다');

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) throw new Error('로그인이 필요합니다');
    return this.mapUser({ data: user });
  }

  async getUsers(): Promise<UsersResponse> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, raw_user_meta_data');

    if (error) throw new Error(error.message);

    return this.mapUsers({ data } as UsersEntity);
  }

  private mapUser(userEntity: UserEntity): UserResponse {
    const { data: user } = userEntity;
    const { id, user_metadata, role } = user;

    return {
      data: {
        id: id,
        role: role ? 'authenticated' : undefined,
        avatar: user_metadata.avatar,
        nickname: user_metadata.nickname,
      },
    };
  }

  private mapUsers(usersEntity: UsersEntity): UsersResponse {
    const { data } = usersEntity;

    return {
      data: data.map(({ id, raw_user_meta_data: { nickname, avatar } }) => ({
        id,
        avatar: avatar!,
        nickname,
      })),
    };
  }
}
