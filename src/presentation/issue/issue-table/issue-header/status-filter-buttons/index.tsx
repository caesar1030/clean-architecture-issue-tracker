import Button from '../../../../../common-ui/button';
import useSearchParamsHandlers from '../../../use-search-params-handlers';
import openedIssueIcon from '../../../../../assets/opened-issue.svg';
import closedIssueIcon from '../../../../../assets/closed-issue.svg';

interface StatusFilterButtonsProps {
  openIssueCount: number | undefined;
  closeIssueCount: number | undefined;
}

function StatusFilterButtons({
  openIssueCount = 0,
  closeIssueCount = 0,
}: StatusFilterButtonsProps) {
  const { setOpenStatusSearchParam, isOpenStatus, isCloseStatus } =
    useSearchParamsHandlers();

  return (
    <div className="flex gap-6">
      <Button
        variant="ghosts"
        size="M"
        flexible
        onClick={() => setOpenStatusSearchParam(true)}
        active={isOpenStatus}
      >
        <img src={openedIssueIcon} alt="열린 이슈" />
        <span>열린 이슈({openIssueCount})</span>
      </Button>
      <Button
        variant="ghosts"
        size="M"
        flexible
        onClick={() => setOpenStatusSearchParam(false)}
        active={isCloseStatus}
      >
        <img src={closedIssueIcon} alt="닫힌 이슈" />
        <span>닫힌 이슈({closeIssueCount})</span>
      </Button>
    </div>
  );
}
export default StatusFilterButtons;
