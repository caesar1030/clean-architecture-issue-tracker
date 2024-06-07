import logoMediumIcon from '@/assets/logo-medium.svg';
import logoLargeIcon from '@/assets/logo-large.svg';

interface LogoProps {
  size?: 'M' | 'L';
}

const sizes = {
  M: {
    src: logoMediumIcon,
  },
  L: {
    src: logoLargeIcon,
  },
};

const Logo = ({ size = 'M' }: LogoProps) => {
  return (
    <div className="text-center">
      <img src={sizes[size].src} alt="Logo" />
    </div>
  );
};

export default Logo;
