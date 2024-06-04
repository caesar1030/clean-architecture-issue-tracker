import { Link, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import useLogout from '@/presentation/auth/use-logout';
import useUser from '@/presentation/auth/use-user';
import Logo from '@/common-ui/logo';
import Avatar from '@/common-ui/avatar';
import Button from '@/common-ui/button';
import LogoutIcon from '@/common-ui/logout-icon';

function AppLayout() {
  const { logout } = useLogout();
  const { user } = useUser();

  return (
    <div className="px-20">
      <header className="flex justify-between items-center py-7">
        <Link to="/issues?isOpen=open">
          <Logo size="medium" />
        </Link>

        <div className="flex items-center">
          <Avatar src={user?.avatar} />
          <Button variant="ghosts" size="S" flexible onClick={() => logout()}>
            <LogoutIcon />
          </Button>
        </div>
      </header>

      <main className="flex flex-col gap-6 py-8">
        <Suspense fallback={<span>loading..</span>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default AppLayout;
