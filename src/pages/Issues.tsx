import Button from '@/common-ui/button';
import IssueFilterBar from '@/presentation/issue/issue-filter-bar';
import IssueFilterResetButton from '@/presentation/issue/issue-filter-reset-button';
import IssueTable from '@/presentation/issue/issue-table';
import plusWhiteIcon from '@/assets/plus-white.svg';
import labelBoldIcon from '@/assets/label-bold.svg';
import milestoneBoldIcon from '@/assets/milestone-bold.svg';
import useLabels from '@/presentation/label/use-labels';
import useMilestones from '@/presentation/milestone/use-milestones';

function Issues() {
  const { labels } = useLabels();
  const { milestones } = useMilestones();

  return (
    <>
      <div className="flex justify-between">
        <IssueFilterBar />

        <div className="flex gap-4">
          <nav className="inline-flex justify-center align-middle border border-neutral-border bg-neutral-background rounded-regular">
            <Button to="/labels" size="M" variant="ghosts">
              <img src={labelBoldIcon} alt="라벨" />
              <span>라벨 ({labels.length})</span>
            </Button>
            <div className="bg-neutral-border w-px" />
            <Button to="/milestones" size="M" variant="ghosts">
              <img src={milestoneBoldIcon} alt="마일스톤" />
              <span>마일스톤({milestones?.length})</span>
            </Button>
          </nav>
          <Button to="/new-issue" size="S" variant="contained">
            <img src={plusWhiteIcon} alt="이슈 작성" />
            이슈 작성
          </Button>
        </div>
      </div>

      <IssueFilterResetButton />

      <IssueTable />
    </>
  );
}
export default Issues;
