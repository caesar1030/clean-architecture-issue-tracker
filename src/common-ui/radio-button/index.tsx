import checkOnCircleIcon from '../../assets/check-on-circle.svg';
import checkOffCircleIcon from '../../assets/check-off-circle.svg';

interface RadioButtonProps {
  checked: boolean;
}

function RadioButton({ checked }: RadioButtonProps) {
  return checked ? (
    <img src={checkOnCircleIcon} alt="미선택된 옵션" />
  ) : (
    <img src={checkOffCircleIcon} alt="선택된 옵션" />
  );
}
export default RadioButton;
