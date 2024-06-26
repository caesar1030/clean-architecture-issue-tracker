import chevronDown from '@/assets/chevron-down.svg';
import Button from '@/common-ui/button';
import Menus from '@/common-ui/menus';
import Table from '@/common-ui/table';
import { useSelectedIssues } from '@/presentation/issue/issue-table/selected-issues-context';
import useCloseIssues from '@/presentation/issue/use-close-issues';
import useOpenIssues from '@/presentation/issue/use-open-issues';

const StatusUpdateMenu = () => {
  const { openIssues } = useOpenIssues();
  const { closeIssues } = useCloseIssues();
  const { selectedIssueIds, deselectAllIssues } = useSelectedIssues();

  const handleOpenIssues = () => {
    openIssues({ issueIds: selectedIssueIds });
    deselectAllIssues();
  };

  const handleCloseIssues = () => {
    closeIssues({ issueIds: selectedIssueIds });
    deselectAllIssues();
  };

  return (
    <>
      <Menus.Trigger id="상태수정" windowPosition="right">
        <Button variant="ghosts" size="M" flexible>
          <span>상태 수정</span>
          <img width={16} height={16} src={chevronDown} alt="상태 수정" />
        </Button>
      </Menus.Trigger>

      <Menus.Window id="상태수정">
        <Table columns="1fr" size="S">
          <Table.Header>상태 변경</Table.Header>
          <Table.Row>
            <Menus.Button onClick={handleOpenIssues}>
              선택한 이슈 열기
            </Menus.Button>
          </Table.Row>
          <Table.Row>
            <Menus.Button onClick={handleCloseIssues}>
              선택한 이슈 닫기
            </Menus.Button>
          </Table.Row>
        </Table>
      </Menus.Window>
    </>
  );
};

export default StatusUpdateMenu;
