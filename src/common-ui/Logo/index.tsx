interface LogoProps {
  size: 'medium' | 'large';
}

const sizes = {
  medium: '/public/logo-medium.svg',
  large: '/public/logo-large.svg',
};

function Logo({ size }: LogoProps) {
  return (
    <div className="text-center">
      <img className="w-[200px] h-10" src={sizes[size]} alt="Logo" />
    </div>
  );
}

export default Logo;
