import { Link } from 'react-router-dom';
import Logo from '../logo';

function Header() {
  return (
    <header className="justify-between py-7">
      <Link to="/issues?isOpen=open">
        <Logo size="medium" />
      </Link>
    </header>
  );
}
export default Header;
