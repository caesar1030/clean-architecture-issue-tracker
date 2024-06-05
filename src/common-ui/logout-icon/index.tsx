import { ComponentPropsWithoutRef } from 'react';
import logoutIcon from '@/assets/logout.svg';

interface LogoutIconProps extends ComponentPropsWithoutRef<'img'> {}

const LogoutIcon = (_: LogoutIconProps) => {
  return <img width={20} height={20} src={logoutIcon} className="w-8 h-8" alt="logout" />;
};
export default LogoutIcon;
