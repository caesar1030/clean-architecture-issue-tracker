import Button from '../button';
import labelBoldIcon from '../../assets/label-bold.svg';
import milestoneBoldIcon from '../../assets/milestone-bold.svg';
import useLabels from '../../presentation/label/use-labels';
import useMilestones from '../../presentation/milestone/use-milestones';

const Navbar = () => {
  const { labels } = useLabels();
  const { milestones } = useMilestones();

  return (
    <nav className="inline-flex justify-center align-middle border border-neutral-border bg-neutral-background rounded-regular">
      <Button to="/labels" size="M" variant="ghosts">
        <img src={labelBoldIcon} alt="라벨" />
        <span>라벨 ({labels.length})</span>
      </Button>
      <div className="bg-neutral-border w-px" />
      <Button size="M" variant="ghosts">
        <img src={milestoneBoldIcon} alt="마일스톤" />
        <span>마일스톤({milestones?.data.length})</span>
      </Button>
    </nav>
  );
};
export default Navbar;
