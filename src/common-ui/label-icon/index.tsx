interface LabelIconProps {
  backgroundColor: string;
}

const LabelIcon = ({ backgroundColor }: LabelIconProps) => {
  return <div style={{ backgroundColor }} className="w-5 h-5 rounded-full" />;
}
export default LabelIcon;
