interface AvatarProps {
  src?: string;
}

function Avatar({ src }: AvatarProps) {
  const style = {
    backgroundImage: `url(${src || '/public/user.svg'})`,
  };

  return (
    <div
      style={style}
      className="w-8 h-8 rounded-full bg-lightgray border border-solid bg-cover bg-center bg-no-repeat"
    />
  );
}

export default Avatar;
