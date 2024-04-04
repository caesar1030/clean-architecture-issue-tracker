import Button from '../../../../../common-ui/button';
import Menus from '../../../../../common-ui/menus';
import Table from '../../../../../common-ui/table';
import useMilestones from '../../../../milestone/use-milestones';
import RadioButton from '../../../../../common-ui/radio-button';
import useSearchParamsHandlers from '../../../use-search-params-handlers';
import chevronDownIcon from '../../../../../assets/chevron-down.svg';

function MilestoneFilterMenu() {
  const { milestones } = useMilestones();
  const {
    toggleMilestoneSearchParam,
    toggleNotWithMilestone,
    getMilestoneSearchParam,
    isNotWithMilestone,
  } = useSearchParamsHandlers();

  return (
    <>
      <Menus.OpenButton id="마일스톤필터" windowPosition="center">
        <Button variant="ghosts" size="M" flexible>
          <span>마일스톤</span>
          <img src={chevronDownIcon} alt="마일스톤필터" />
        </Button>
      </Menus.OpenButton>

      <Menus.Window id="마일스톤필터">
        <Table columns="1fr" size="S">
          <Table.Header>마일스톤 필터</Table.Header>

          <Table.Row>
            <Menus.Button onClick={() => toggleNotWithMilestone()}>
              <div className="flex gap-2 items-center">
                <span className="grow">마일스톤이 없는 이슈</span>
                <RadioButton checked={isNotWithMilestone} />
              </div>
            </Menus.Button>
          </Table.Row>

          {milestones?.map(({ id, title }) => (
            <Table.Row key={id}>
              <Menus.Button onClick={() => toggleMilestoneSearchParam(title)}>
                <div className="flex gap-2 items-center">
                  <span className="grow">{title}</span>
                  <RadioButton checked={getMilestoneSearchParam() === title} />
                </div>
              </Menus.Button>
            </Table.Row>
          ))}
        </Table>
      </Menus.Window>
    </>
  );
}
export default MilestoneFilterMenu;
