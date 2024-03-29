import useIssues from '../use-issues';
import Table from '../../../common-ui/table';
import IssueRow from './issue-row';
import IssueHeader from './issue-header';
import Menus from '../../../common-ui/menus';
import { SelectedIssuesProvider } from './selected-issues-context';
import { IssuesResponse } from '../../../domain/model/issue/response';

function IssueTable() {
  const { issues, openIssueCount, closeIssueCount } = useIssues();

  return (
    <SelectedIssuesProvider>
      <Menus>
        <Table columns="1rem 1fr auto" size="L">
          <Table.Header>
            <IssueHeader
              issues={issues}
              openIssueCount={openIssueCount}
              closeIssueCount={closeIssueCount}
            />
          </Table.Header>
          <Table.Body<IssuesResponse['data'][number]>
            data={issues}
            render={(issue) => <IssueRow key={issue.id} issue={issue} />}
          />
        </Table>
      </Menus>
    </SelectedIssuesProvider>
  );
}
export default IssueTable;
