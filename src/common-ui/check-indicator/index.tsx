import checkOnCircleIcon from '@/assets/check-on-circle.svg';
import checkOffCircleIcon from '@/assets/check-off-circle.svg';

interface CheckIndicatorProps {
  checked?: boolean;
}

const CheckIndicator = ({ checked = false }: CheckIndicatorProps) => {
  return checked ? (
    <img
      width={16}
      height={16}
      src={checkOnCircleIcon}
      alt="선택된 옵션"
      aria-checked={true}
    />
  ) : (
    <img
      width={16}
      height={16}
      src={checkOffCircleIcon}
      alt="미선택된 옵션"
      aria-checked={false}
    />
  );
};

export default CheckIndicator;
