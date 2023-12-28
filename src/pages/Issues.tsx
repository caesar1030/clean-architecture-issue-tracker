import { Link } from 'react-router-dom';
import Button from '../common-ui/button';
import IssueFilterBar from '../presentation/issue/issue-filter-bar';
import IssueFilterResetButton from '../presentation/issue/issue-filter-reset-button';
import IssueTable from '../presentation/issue/issue-table';

function Issues() {
  return (
    <>
      <div className="flex justify-between">
        <IssueFilterBar />
        <Link to={'/new-issue'}>
          <Button size="S" variant="contained">
            이슈 작성
          </Button>
        </Link>
      </div>

      <IssueFilterResetButton />

      <IssueTable />
    </>
  );
}
export default Issues;
