import { ComponentPropsWithoutRef } from 'react';
import logoutIcon from '@/assets/logout.svg';

interface LogoutIconProps extends ComponentPropsWithoutRef<'img'> {}

const LogoutIcon = (_: LogoutIconProps) => {
  return <img src={logoutIcon} className="w-8 h-8" alt="logout" />;
};
export default LogoutIcon;
