interface LogoProps {
  size: 'medium' | 'large';
}

const sizes = {
  medium: {
    src: '/public/logo-medium.svg',
  },
  large: { src: '/public/logo-large.svg' },
};

function Logo({ size }: LogoProps) {
  return (
    <div className="text-center">
      <img src={sizes[size].src} alt="Logo" />
    </div>
  );
}

export default Logo;
