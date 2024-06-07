import { Link, Outlet } from 'react-router-dom';
import useLogout from '@/presentation/auth/use-logout';
import useUser from '@/presentation/auth/use-user';
import Logo from '@/common-ui/logo';
import Avatar from '@/common-ui/avatar';
import Button from '@/common-ui/button';
import logoutIcon from '@/assets/logout.svg';

const AppLayout = () => {
  const { logout } = useLogout();
  const { user } = useUser();

  return (
    <div className="px-20">
      <header className="flex justify-between items-center py-7">
        <Link to="/issues?isOpen=open">
          <Logo size="M" />
        </Link>

        <div className="flex items-center">
          <Avatar src={user?.avatar} />
          <Button variant="ghosts" size="S" flexible onClick={() => logout()}>
            <img
              width={20}
              height={20}
              src={logoutIcon}
              className="w-8 h-8"
              alt="logout"
            />
          </Button>
        </div>
      </header>

      <main className="flex flex-col gap-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
