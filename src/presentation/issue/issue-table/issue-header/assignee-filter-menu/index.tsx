import Avatar from '../../../../../common-ui/avatar';
import Button from '../../../../../common-ui/button';
import Menus from '../../../../../common-ui/menus';
import RadioButton from '../../../../../common-ui/radio-button';
import Table from '../../../../../common-ui/table';
import useUsers from '../../../../auth/use-users';
import useSearchParamsHandlers from '../../../use-search-params-handlers';

function AssigneeFilterMenu() {
  const { users } = useUsers();
  const {
    toggleAssigneeSearchParam,
    toggleAssignedToNobody,
    isAssignedToNobody,
    getAssigneeSearchParam,
  } = useSearchParamsHandlers();

  return (
    <>
      <Menus.OpenButton id="assigneeFilter" windowPosition="center">
        <Button variant="ghosts" size="M" flexible>
          <span>담당자</span>
          <img src="/public/chevron-down.svg" alt="이슈" />
        </Button>
      </Menus.OpenButton>

      <Menus.Window id="assigneeFilter">
        <Table columns="1fr" size="S">
          <Table.Header>담당자 필터</Table.Header>

          <Table.Row>
            <Menus.Button onClick={() => toggleAssignedToNobody()}>
              <div className="flex gap-2 items-center">
                <span className="grow">담당자가 없는 이슈</span>
                <RadioButton checked={isAssignedToNobody} />
              </div>
            </Menus.Button>
          </Table.Row>

          {users?.data?.map(({ id, nickname, avatar }) => (
            <Table.Row key={id}>
              <Menus.Button onClick={() => toggleAssigneeSearchParam(nickname)}>
                <div className="flex gap-2 items-center">
                  <Avatar src={avatar} />
                  <span className="grow">{nickname}</span>
                  <RadioButton
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
}
export default AssigneeFilterMenu;
