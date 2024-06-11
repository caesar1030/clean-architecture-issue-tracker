import chevronDownIcon from '@/assets/chevron-down.svg';
import Avatar from '@/common-ui/avatar';
import Button from '@/common-ui/button';
import Menus from '@/common-ui/menus';
import CheckIndicator from '@/common-ui/check-indicator';
import Table from '@/common-ui/table';
import useUsers from '@/presentation/auth/use-users';
import useSearchParamsHandlers from '@/presentation/issue/use-search-params-handlers';

const AssigneeFilterMenu = () => {
  const { users } = useUsers();
  const {
    toggleAssigneeSearchParam,
    toggleAssignedToNobody,
    isAssignedToNobody,
    getAssigneeSearchParam,
  } = useSearchParamsHandlers();

  return (
    <>
      <Menus.Trigger id="assigneeFilter" windowPosition="center">
        <Button variant="ghosts" size="M" flexible>
          <span>담당자</span>
          <img width={16} height={16} src={chevronDownIcon} alt="이슈" />
        </Button>
      </Menus.Trigger>

      <Menus.Window id="assigneeFilter">
        <Table columns="1fr" size="S">
          <Table.Header>담당자 필터</Table.Header>

          <Table.Row>
            <Menus.Button onClick={() => toggleAssignedToNobody()}>
              <div className="flex gap-2 items-center">
                <span className="grow">담당자가 없는 이슈</span>
                <CheckIndicator checked={isAssignedToNobody} />
              </div>
            </Menus.Button>
          </Table.Row>

          {users?.data?.map(({ id, nickname, avatar }) => (
            <Table.Row key={id}>
              <Menus.Button onClick={() => toggleAssigneeSearchParam(nickname)}>
                <div className="flex gap-2 items-center">
                  <Avatar src={avatar} />
                  <span className="grow">{nickname}</span>
                  <CheckIndicator
                    checked={getAssigneeSearchParam() === nickname}
                  />
                </div>
              </Menus.Button>
            </Table.Row>
          ))}
        </Table>
      </Menus.Window>
    </>
  );
};

export default AssigneeFilterMenu;
