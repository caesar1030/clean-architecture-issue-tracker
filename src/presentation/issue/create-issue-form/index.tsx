import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import chevronDownIcon from '@/assets/chevron-down.svg';
import closeIcon from '@/assets/close-icon.svg';
import { User } from '@/services/user/user';
import useMilestones from '@/presentation/milestone/use-milestones';
import useLabels from '@/presentation/label/use-labels';
import useUsers from '@/presentation/auth/use-users';
import useCreateIssue from '@/presentation/issue/use-create-issue';
import useUser from '@/presentation/auth/use-user';
import Input from '@/common-ui/input';
import TextArea from '@/common-ui/text-area';
import Menus from '@/common-ui/menus';
import SideBar from '@/common-ui/side-bar';
import Button from '@/common-ui/button';
import Avatar from '@/common-ui/avatar';
import LabelTag from '@/common-ui/label-tag';
import Table from '@/common-ui/table';
import CheckIndicator from '@/common-ui/check-indicator';
import Divider from '@/common-ui/divider';
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueSchema } from '@/schemas/issue/issue-schema';
import { Label } from '@/services/label/label';
import { MilestonesResopnse } from '@/services/milestone/response';

interface FormType {
  title: string;
  contents: string;
  milestone: MilestonesResopnse['data'][number] | null;
  label: Label | null;
  assignee: User | null;
}

const CreateIssueForm = () => {
  const { milestones } = useMilestones();
  const { labels } = useLabels();
  const { users } = useUsers();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormType>({
    defaultValues: {
      title: '',
      contents: '',
      milestone: null,
      label: null,
      assignee: null,
    },
    resolver: zodResolver(IssueSchema),
    mode: 'onChange',
  });
  const { createIssue } = useCreateIssue();
  const { user } = useUser();
  const selectedLabel = watch('label');
  const selectedMilestone = watch('milestone');
  const selectedAssignee = watch('assignee');

  const addLabel = (label: Label) => {
    if (label.id === selectedLabel?.id) {
      setValue('label', null);
      return;
    }

    setValue('label', label);
  };

  const addMilestone = (milestone: MilestonesResopnse['data'][number]) => {
    if (milestone.id === selectedMilestone?.id) {
      setValue('milestone', null);
      return;
    }

    setValue('milestone', milestone);
  };

  const addAssignee = (assignee: User) => {
    if (assignee.id === selectedAssignee?.id) {
      setValue('assignee', null);
      return;
    }

    setValue('assignee', assignee);
  };

  const onSubmit: SubmitHandler<FormType> = ({
    title,
    contents,
    label,
    milestone,
    assignee,
  }) => {
    createIssue({
      title,
      contents,
      labelId: label?.id,
      milestoneId: milestone?.id,
      assigneeId: assignee?.id,
      authorId: user!.id,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grow flex flex-col gap-6"
      >
        <div className="grid grid-cols-[19fr_6fr] gap-6">
          <div className="flex flex-col gap-2">
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Input
                    id="issueTitle"
                    label="제목"
                    labelPosition="top"
                    error={errors.title?.message}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') e.preventDefault();
                    }}
                    {...field}
                  />
                );
              }}
            />

            <Controller
              name="contents"
              control={control}
              render={({ field }) => {
                return (
                  <TextArea
                    id="issue-contents"
                    label="코멘트를 입력하세요"
                    className="h-[436px]"
                    error={errors.contents?.message}
                    {...field}
                  />
                );
              }}
            />
          </div>

          <Menus>
            <SideBar>
              <>
                <Menus.Trigger id="addAssignee" windowPosition="center">
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
                      alt="라벨추가"
                    />
                  </Button>
                </Menus.Trigger>
                {selectedAssignee && (
                  <div className="flex gap-2 items-center">
                    <Avatar src={selectedAssignee.avatar} />
                    <span className="text-S text-neutral-text-strong">
                      {selectedAssignee.nickname}
                    </span>
                  </div>
                )}
              </>
              <>
                <Menus.Trigger id="addLabel" windowPosition="center">
                  <Button
                    variant="ghosts"
                    size="M"
                    flexible
                    className="w-full"
                    type="button"
                  >
                    <span className="grow text-left">라벨</span>
                    <img
                      width={16}
                      height={16}
                      src={chevronDownIcon}
                      alt="라벨추가"
                    />
                  </Button>
                </Menus.Trigger>
                {selectedLabel && (
                  <LabelTag
                    backgroundColor={selectedLabel.backgroundColor!}
                    textColor={selectedLabel.textColor!}
                    className="h-6"
                  >
                    {selectedLabel.title}
                  </LabelTag>
                )}
              </>

              <>
                <Menus.Trigger id="addMilestone" windowPosition="center">
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
                      alt="마일스톤추가"
                    />
                  </Button>
                </Menus.Trigger>
                {selectedMilestone && (
                  <span className="text-S text-neutral-text-strong">
                    {selectedMilestone.title}
                  </span>
                )}
              </>
            </SideBar>

            <Menus.Window id="addAssignee">
              <Table columns="1fr" size="S">
                <Table.Body
                  data={users?.data}
                  render={(user) => (
                    <Table.Row key={user.id}>
                      <Menus.Button onClick={() => addAssignee(user)}>
                        <div className="flex gap-2 items-center">
                          <Avatar src={user.avatar} />
                          <span className="grow">{user.nickname}</span>
                          <CheckIndicator
                            checked={user.id === selectedAssignee?.id}
                          />
                        </div>
                      </Menus.Button>
                    </Table.Row>
                  )}
                />
              </Table>
            </Menus.Window>

            <Menus.Window id="addLabel">
              <Table columns="1fr" size="S">
                <Table.Body
                  data={labels}
                  render={(label) => (
                    <Table.Row key={label.id}>
                      <Menus.Button onClick={() => addLabel(label)}>
                        <div className="flex gap-2 items-center">
                          <span className="grow">{label.title}</span>
                          <CheckIndicator
                            checked={label.id === selectedLabel?.id}
                          />
                        </div>
                      </Menus.Button>
                    </Table.Row>
                  )}
                />
              </Table>
            </Menus.Window>

            <Menus.Window id="addMilestone">
              <Table columns="1fr" size="S">
                <Table.Body
                  data={milestones}
                  render={(milestone) => (
                    <Table.Row key={milestone.id}>
                      <Menus.Button onClick={() => addMilestone(milestone)}>
                        <div className="flex gap-2 items-center">
                          <span className="grow">{milestone.title}</span>
                          <CheckIndicator
                            checked={milestone.id === selectedMilestone?.id}
                          />
                        </div>
                      </Menus.Button>
                    </Table.Row>
                  )}
                />
              </Table>
            </Menus.Window>
          </Menus>
        </div>

        <Divider />

        <div className="flex justify-end items-center gap-8">
          <Link to={'/issues?isOpen=open'}>
            <Button size="M" variant="ghosts" flexible type="button">
              <img width={16} height={16} src={closeIcon} alt="작성 취소" />
              <span>작성 취소</span>
            </Button>
          </Link>

          <Button
            size="L"
            variant="contained"
            type="submit"
            disabled={!isValid}
          >
            완료
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateIssueForm;
