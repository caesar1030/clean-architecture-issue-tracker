import userIcon from '@/assets/user.svg';

interface AvatarProps {
  src?: string;
}

const Avatar = ({ src }: AvatarProps) => {
  const style = {
    backgroundImage: `url(${src || userIcon})`,
  };

  return (
    <div
      style={style}
      role="img"
      aria-label={'사용자 아바타'}
      className="w-8 h-8 rounded-full bg-lightgray border border-solid bg-cover bg-center bg-no-repeat"
    />
  );
};

export default Avatar;
