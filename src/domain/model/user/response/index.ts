import { User } from '@/domain/model/user/user';

export interface UserResponse {
  data: {
    id: User['id'];
    role: User['role'];
    avatar: User['avatar'];
    nickname: User['nickname'];
  };
}

export interface UsersResponse {
  data: {
    id: User['id'];
    avatar: User['avatar'];
    nickname: User['nickname'];
  }[];
}
