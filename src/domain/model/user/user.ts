type UserId = Brand<string, 'UserId'>;
type UserRole = 'authenticated' | undefined;
type UserNickname = Brand<string, 'UserNickname'>;
type UserAvatar = Brand<string, 'UserAvatar'>;

export interface User {
  id: UserId;
  role?: UserRole;
  nickname: UserNickname;
  avatar: UserAvatar;
}
