type UserId = Brand<string, 'UserId'>;
type UserRole = 'authenticated' | undefined;

export interface User {
  id: UserId | null;
  role: UserRole | null;
}
