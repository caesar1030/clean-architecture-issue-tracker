import { ComponentPropsWithoutRef } from 'react';

interface LogoutIconProps extends ComponentPropsWithoutRef<'img'> {}

function LogoutIcon(_: LogoutIconProps) {
  return <img src="/public/logout.svg" className="w-8 h-8" alt="logout" />;
}
export default LogoutIcon;
