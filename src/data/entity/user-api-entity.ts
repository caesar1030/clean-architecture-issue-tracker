export interface UserEntity {
  data: {
    id: string;
    role?: string;
    user_metadata: any;
  };
}

export interface UsersEntity {
  data: {
    id: string;
    raw_user_meta_data: {
      avatar?: string;
      nickname: string;
    };
  }[];
}
