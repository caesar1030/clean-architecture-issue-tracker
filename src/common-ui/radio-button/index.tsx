import checkOnCircleIcon from '@/assets/check-on-circle.svg';
import checkOffCircleIcon from '@/assets/check-off-circle.svg';

interface RadioButtonProps {
  checked: boolean;
}

const RadioButton = ({ checked }: RadioButtonProps) => {
  return checked ? (
    <img width={16} height={16} src={checkOnCircleIcon} alt="선택된 옵션" />
  ) : (
    <img width={16} height={16} src={checkOffCircleIcon} alt="미선택된 옵션" />
  );
};

export default RadioButton;
