export interface UserEntity {
  data: {
    user: {
      id: string;
      role: string | undefined;
      user_metadata: {
        nickname: string;
        avatar: string;
      };
    };
  };
}
