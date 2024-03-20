import Button from '../common-ui/button';
import IssueFilterBar from '../presentation/issue/issue-filter-bar';
import IssueFilterResetButton from '../presentation/issue/issue-filter-reset-button';
import IssueTable from '../presentation/issue/issue-table';
import Navbar from '../common-ui/navbar';

function Issues() {
  return (
    <>
      <div className="flex justify-between">
        <IssueFilterBar />

        <div className="flex gap-4">
          <Navbar />
          <Button to="/new-issue" size="S" variant="contained">
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
