import { ComponentPropsWithoutRef } from 'react';

interface LogoutIconProps extends ComponentPropsWithoutRef<'img'> {}

function LogoutIcon(_: LogoutIconProps) {
  return <img src="/public/logout.svg" alt="logout" />;
}
export default LogoutIcon;
