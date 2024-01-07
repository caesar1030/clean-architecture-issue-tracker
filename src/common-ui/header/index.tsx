import { Link } from 'react-router-dom';
import Logo from '../logo';
import LogoutIcon from '../logout-icon';
import useLogout from '../../presentation/auth/use-logout';
import Button from '../button';

function Header() {
  const { logout } = useLogout();

  return (
    <header className="flex justify-between items-center py-7">
      <Link to="/issues?isOpen=open">
        <Logo size="medium" />
      </Link>

      <div>
        <Button variant="ghosts" size="S" flexible onClick={() => logout()}>
          <LogoutIcon />
        </Button>
      </div>
    </header>
  );
}
export default Header;
