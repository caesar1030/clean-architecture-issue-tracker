export interface UserEntity {
  data: {
    user: {
      id: string;
      role: string | undefined;
    } | null;
  };
}
