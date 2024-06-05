import chevronDownIcon from '@/assets/chevron-down.svg';
import Avatar from '@/common-ui/avatar';
import Button from '@/common-ui/button';
import Menus from '@/common-ui/menus';
import RadioButton from '@/common-ui/radio-button';
import Table from '@/common-ui/table';
import useUsers from '@/presentation/auth/use-users';
import useSearchParamsHandlers from '@/presentation/issue/use-search-params-handlers';

const AuthorFilterMenu = () => {
  const { users } = useUsers();
  const { toggleAuthorSearchParam, getAuthorSearchParam } =
    useSearchParamsHandlers();

  return (
    <>
      <Menus.OpenButton id="authorFilter" windowPosition="right">
        <Button variant="ghosts" size="M" flexible>
          <span>작성자</span>
          <img width={16} height={16} src={chevronDownIcon} alt="이슈" />
        </Button>
      </Menus.OpenButton>

      <Menus.Window id="authorFilter">
        <Table columns="1fr" size="S">
          <Table.Header>작성자 필터</Table.Header>

          {users?.data?.map(({ id, nickname, avatar }) => (
            <Table.Row key={id}>
              <Menus.Button onClick={() => toggleAuthorSearchParam(nickname)}>
                <div className="flex gap-2 items-center">
                  <Avatar src={avatar} />
                  <span className="grow">{nickname}</span>
                  <RadioButton checked={getAuthorSearchParam() === nickname} />
                </div>
              </Menus.Button>
            </Table.Row>
          ))}
        </Table>
      </Menus.Window>
    </>
  );
};

export default AuthorFilterMenu;
