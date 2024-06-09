import chevronDownIcon from '@/assets/chevron-down.svg';
import Avatar from '@/common-ui/avatar';
import Button from '@/common-ui/button';
import LabelTag from '@/common-ui/label-tag';
import Menus from '@/common-ui/menus';
import RadioButton from '@/common-ui/radio-button';
import SideBar from '@/common-ui/side-bar';
import Table from '@/common-ui/table';
import { IssueResponse } from '@/services/issue/response';
import useUsers from '@/presentation/auth/use-users';
import useEditIssue from '@/presentation/issue/use-edit-issue';
import useLabels from '@/presentation/label/use-labels';
import useMilestones from '@/presentation/milestone/use-milestones';

interface IssueDetailSideBarProps {
  issue: IssueResponse['data'] | undefined;
}

const IssueDetailSideBar = ({ issue }: IssueDetailSideBarProps) => {
  const { users } = useUsers();
  const { milestones } = useMilestones();
  const { labels } = useLabels();
  const { editIssue } = useEditIssue();

  return (
    <>
      <Menus>
        <SideBar>
          <>
            <Menus.Trigger id="assignee" windowPosition="center">
              <Button
                variant="ghosts"
                size="M"
                flexible
                className="w-full"
                type="button"
              >
                <span className="grow text-left">담당자</span>
                <img
                  width={16}
                  height={16}
                  src={chevronDownIcon}
                  alt="담당자"
                />
              </Button>
            </Menus.Trigger>
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
            <Menus.Trigger id="label" windowPosition="center">
              <Button
                variant="ghosts"
                size="M"
                flexible
                className="w-full"
                type="button"
              >
                <span className="grow text-left">레이블</span>
                <img
                  width={16}
                  height={16}
                  src={chevronDownIcon}
                  alt="레이블"
                />
              </Button>
            </Menus.Trigger>
            {issue?.label && (
              <LabelTag
                backgroundColor={issue.label.backgroundColor!}
                textColor={issue.label.textColor!}
                className="h-6"
              >
                {issue.label.title}
              </LabelTag>
            )}
          </>

          <>
            <Menus.Trigger id="milestone" windowPosition="center">
              <Button
                variant="ghosts"
                size="M"
                flexible
                className="w-full"
                type="button"
              >
                <span className="grow text-left">마일스톤</span>
                <img
                  width={16}
                  height={16}
                  src={chevronDownIcon}
                  alt="마일스톤"
                />
              </Button>
            </Menus.Trigger>
            {issue?.milestone && (
              <span className="text-S text-neutral-text-strong">
                {issue.milestone.title}
              </span>
            )}
          </>
        </SideBar>

        <Menus.Window id="assignee">
          <Table columns="1fr" size="S">
            <Table.Body
              data={users?.data || []}
              render={(assignee) => (
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
              )}
            />
          </Table>
        </Menus.Window>

        <Menus.Window id="label">
          <Table columns="1fr" size="S">
            <Table.Body
              data={labels}
              render={(label) => (
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
              )}
            />
          </Table>
        </Menus.Window>

        <Menus.Window id="milestone">
          <Table columns="1fr" size="S">
            <Table.Body
              data={milestones}
              render={(milestone) => (
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
              )}
            />
          </Table>
        </Menus.Window>
      </Menus>
    </>
  );
};

export default IssueDetailSideBar;
