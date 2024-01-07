export interface UserEntity {
  data: {
    user: {
      id: string | null;
      role: string | undefined;
    } | null;
  };
}
