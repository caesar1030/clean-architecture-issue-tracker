import logoMediumIcon from '../../assets/logo-medium.svg';
import logoLargeIcon from '../../assets/logo-large.svg';

interface LogoProps {
  size: 'medium' | 'large';
}

const sizes = {
  medium: {
    src: logoMediumIcon,
  },
  large: {
    src: logoLargeIcon,
  },
};

function Logo({ size }: LogoProps) {
  return (
    <div className="text-center">
      <img src={sizes[size].src} alt="Logo" />
    </div>
  );
}

export default Logo;
