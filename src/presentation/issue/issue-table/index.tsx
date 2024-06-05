import Menus from '@/common-ui/menus';
import Table from '@/common-ui/table';
import { IssuesResponse } from '@/model/issue/response';
import IssueHeader from '@/presentation/issue/issue-table/issue-header';
import IssueRow from '@/presentation/issue/issue-table/issue-row';
import { SelectedIssuesProvider } from '@/presentation/issue/issue-table/selected-issues-context';
import useIssues from '@/presentation/issue/use-issues';

const IssueTable = () => {
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
};

export default IssueTable;
