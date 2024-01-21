import Button from '../../../../common-ui/button';
import Menus from '../../../../common-ui/menus';
import SideBar from '../../../../common-ui/side-bar';
import useMilestones from '../../../milestone/use-milestones';
import useLabels from '../../../label/use-labels';
import useUsers from '../../../auth/use-users';
import { IssueResponse } from '../../../../domain/model/issue/response';
import Table from '../../../../common-ui/table';
import Avatar from '../../../../common-ui/avatar';
import RadioButton from '../../../../common-ui/radio-button';
import Label from '../../../../common-ui/label';
import useEditIssue from '../../use-edit-issue';

interface IssueDetailSideBarProps {
  issue: IssueResponse['data'] | undefined;
}

function IssueDetailSideBar({ issue }: IssueDetailSideBarProps) {
  const { users } = useUsers();
  const { milestones } = useMilestones();
  const { labels } = useLabels();
  const { editIssue } = useEditIssue();

  return (
    <>
      <Menus>
        <SideBar>
          <>
            <Menus.OpenButton id="assignee" windowPosition="center">
              <Button
                variant="ghosts"
                size="M"
                flexible
                className="w-full"
                type="button"
              >
                <span className="grow text-left">담당자</span>
                <img src="/public/chevron-down.svg" alt="담당자" />
              </Button>
            </Menus.OpenButton>
            {issue?.assignee?.id && (
              <div className="flex gap-2 items-center">
                <Avatar src={issue.assignee.avatar} />
                <span className="text-S text-neutral-text-strong">
                  {issue.assignee.nickname}
                </span>
              </div>
            )}
          </>

          <>
            <Menus.OpenButton id="label" windowPosition="center">
              <Button
                variant="ghosts"
                size="M"
                flexible
                className="w-full"
                type="button"
              >
                <span className="grow text-left">레이블</span>
                <img src="/public/chevron-down.svg" alt="레이블" />
              </Button>
            </Menus.OpenButton>
            {issue?.label && (
              <Label
                backgroundColor={issue.label.backgroundColor!}
                textColor={issue.label.textColor!}
                className="h-6"
              >
                {issue.label.title}
              </Label>
            )}
          </>

          <>
            <Menus.OpenButton id="milestone" windowPosition="center">
              <Button
                variant="ghosts"
                size="M"
                flexible
                className="w-full"
                type="button"
              >
                <span className="grow text-left">마일스톤</span>
                <img src="/public/chevron-down.svg" alt="마일스톤" />
              </Button>
            </Menus.OpenButton>
            {issue?.milestone && (
              <span className="text-S text-neutral-text-strong">
                {issue.milestone.title}
              </span>
            )}
          </>
        </SideBar>

        <Menus.Window id="assignee">
          <Table columns="1fr" size="S">
            {users?.data?.map((assignee) => (
              <Table.Row key={assignee.id}>
                <Menus.Button
                  onClick={() => {
                    editIssue({
                      id: issue!.id,
                      assigneeId:
                        issue?.assignee?.id === assignee.id
                          ? null
                          : assignee.id,
                    });
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar src={assignee.avatar} />
                    <span className="grow">{assignee.nickname}</span>
                    <RadioButton
                      checked={assignee.id === issue?.assignee?.id}
                    />
                  </div>
                </Menus.Button>
              </Table.Row>
            ))}
          </Table>
        </Menus.Window>

        <Menus.Window id="label">
          <Table columns="1fr" size="S">
            {labels?.data?.map((label) => (
              <Table.Row key={label.id}>
                <Menus.Button
                  onClick={() => {
                    if (issue?.label?.id === label.id)
                      editIssue({ id: issue!.id, labelId: null });
                    else
                      editIssue({
                        id: issue!.id,
                        labelId:
                          issue?.label?.id === label.id ? null : label.id,
                      });
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <span className="grow">{label.title}</span>
                    <RadioButton checked={label.id === issue?.label?.id} />
                  </div>
                </Menus.Button>
              </Table.Row>
            ))}
          </Table>
        </Menus.Window>

        <Menus.Window id="milestone">
          <Table columns="1fr" size="S">
            {milestones?.data?.map((milestone) => (
              <Table.Row key={milestone.id}>
                <Menus.Button
                  onClick={() => {
                    editIssue({
                      id: issue!.id,
                      milestoneId:
                        issue?.milestone?.id === milestone.id
                          ? null
                          : milestone.id,
                    });
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <span className="grow">{milestone.title}</span>
                    <RadioButton
                      checked={milestone.id === issue?.milestone?.id}
                    />
                  </div>
                </Menus.Button>
              </Table.Row>
            ))}
          </Table>
        </Menus.Window>
      </Menus>
    </>
  );
}
export default IssueDetailSideBar;
