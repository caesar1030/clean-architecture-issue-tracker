import openedIssueIcon from '@/assets/opened-issue.svg';
import closedIssueIcon from '@/assets/closed-issue.svg';
import useSearchParamsHandlers from '@/presentation/issue/use-search-params-handlers';
import Button from '@/common-ui/button';

interface StatusFilterButtonsProps {
  openIssueCount: number | undefined;
  closeIssueCount: number | undefined;
}

const StatusFilterButtons = ({
  openIssueCount = 0,
  closeIssueCount = 0,
}: StatusFilterButtonsProps) => {
  const { setOpenStatusSearchParam } = useSearchParamsHandlers();

  return (
    <div className="flex gap-6">
      <Button
        variant="ghosts"
        size="M"
        flexible
        onClick={() => setOpenStatusSearchParam(true)}
      >
        <img src={openedIssueIcon} alt="열린 이슈" />
        <span>열린 이슈({openIssueCount})</span>
      </Button>
      <Button
        variant="ghosts"
        size="M"
        flexible
        onClick={() => setOpenStatusSearchParam(false)}
      >
        <img src={closedIssueIcon} alt="닫힌 이슈" />
        <span>닫힌 이슈({closeIssueCount})</span>
      </Button>
    </div>
  );
};

export default StatusFilterButtons;
