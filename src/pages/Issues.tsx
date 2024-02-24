import { Link } from 'react-router-dom';
import Button from '../common-ui/button';
import IssueFilterBar from '../presentation/issue/issue-filter-bar';
import IssueFilterResetButton from '../presentation/issue/issue-filter-reset-button';
import IssueTable from '../presentation/issue/issue-table';
import TabButton from '../common-ui/tab-button';
import useLabels from '../presentation/label/use-labels';
import useMilestones from '../presentation/milestone/use-milestones';
import labelBoldIcon from '../assets/label-bold.svg';
import milestoneBoldIcon from '../assets/milestone-bold.svg';

function Issues() {
  // TODO: 훅 제거
  const { labels } = useLabels();
  const { milestones } = useMilestones();
  return (
    <>
      <div className="flex justify-between">
        <IssueFilterBar />
        <div className="flex gap-4">
          <TabButton>
            <Button size="M" variant="ghosts">
              <img src={labelBoldIcon} alt="라벨" />
              <span>라벨 ({labels.length})</span>
            </Button>
            <Button size="M" variant="ghosts">
              <img src={milestoneBoldIcon} alt="마일스톤" />
              <span>마일스톤({milestones?.data.length})</span>
            </Button>
          </TabButton>

          <Link to={'/new-issue'}>
            <Button size="S" variant="contained">
              이슈 작성
            </Button>
          </Link>
        </div>
      </div>

      <IssueFilterResetButton />

      <IssueTable />
    </>
  );
}
export default Issues;
