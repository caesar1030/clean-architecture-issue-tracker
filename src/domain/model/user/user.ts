export interface User {
  id: string;
  role?: 'authenticated' | undefined;
  nickname: string;
  avatar: string;
}
