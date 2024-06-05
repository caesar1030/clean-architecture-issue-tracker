import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Label as LabelModel } from '@/domain/model/label/label';
import { Link } from 'react-router-dom';
import chevronDownIcon from '@/assets/chevron-down.svg';
import closeIcon from '@/assets/close-icon.svg';
import { MilestonesResopnse } from '@/domain/model/milestone/response';
import { User } from '@/domain/model/user/user';
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
import RadioButton from '@/common-ui/radio-button';
import Divider from '@/common-ui/divider';

interface FormType {
  title: string;
  contents: string;
  milestone: MilestonesResopnse['data'][number] | null;
  label: LabelModel | null;
  assignee: User | null;
}

const CreateIssueForm = () => {
  const { milestones } = useMilestones();
  const { labels } = useLabels();
  const { users } = useUsers();
  const { control, handleSubmit, setValue, watch } = useForm<FormType>({
    defaultValues: {
      title: '',
      contents: '',
      milestone: null,
      label: null,
      assignee: null,
    },
  });
  const { createIssue } = useCreateIssue();
  const { user } = useUser();
  const selectedLabel = watch('label');
  const selectedMilestone = watch('milestone');
  const selectedAssignee = watch('assignee');

  const addLabel = (label: LabelModel) => {
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
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextArea
                    id="issueContents"
                    label="코멘트를 입력하세요"
                    className="h-[436px]"
                    {...field}
                  />
                );
              }}
            />
          </div>

          <Menus>
            <SideBar>
              <>
                <Menus.OpenButton id="addAssignee" windowPosition="center">
                  <Button
                    variant="ghosts"
                    size="M"
                    flexible
                    className="w-full"
                    type="button"
                  >
                    <span className="grow text-left">담당자</span>
                    <img src={chevronDownIcon} alt="라벨추가" />
                  </Button>
                </Menus.OpenButton>
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
                <Menus.OpenButton id="addLabel" windowPosition="center">
                  <Button
                    variant="ghosts"
                    size="M"
                    flexible
                    className="w-full"
                    type="button"
                  >
                    <span className="grow text-left">라벨</span>
                    <img src={chevronDownIcon} alt="라벨추가" />
                  </Button>
                </Menus.OpenButton>
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
                <Menus.OpenButton id="addMilestone" windowPosition="center">
                  <Button
                    variant="ghosts"
                    size="M"
                    flexible
                    className="w-full"
                    type="button"
                  >
                    <span className="grow text-left">마일스톤</span>
                    <img src={chevronDownIcon} alt="마일스톤추가" />
                  </Button>
                </Menus.OpenButton>
                {selectedMilestone && (
                  <span className="text-S text-neutral-text-strong">
                    {selectedMilestone.title}
                  </span>
                )}
              </>
            </SideBar>

            <Menus.Window id="addAssignee">
              <Table columns="1fr" size="S">
                {users?.data?.map((user) => (
                  <Table.Row key={user.id}>
                    <Menus.Button onClick={() => addAssignee(user)}>
                      <div className="flex gap-2 items-center">
                        <Avatar src={user.avatar} />
                        <span className="grow">{user.nickname}</span>
                        <RadioButton
                          checked={user.id === selectedAssignee?.id}
                        />
                      </div>
                    </Menus.Button>
                  </Table.Row>
                ))}
              </Table>
            </Menus.Window>

            <Menus.Window id="addLabel">
              <Table columns="1fr" size="S">
                {labels?.map((label) => (
                  <Table.Row key={label.id}>
                    <Menus.Button onClick={() => addLabel(label)}>
                      <div className="flex gap-2 items-center">
                        <span className="grow">{label.title}</span>
                        <RadioButton checked={label.id === selectedLabel?.id} />
                      </div>
                    </Menus.Button>
                  </Table.Row>
                ))}
              </Table>
            </Menus.Window>

            <Menus.Window id="addMilestone">
              <Table columns="1fr" size="S">
                {milestones?.map((milestone) => (
                  <Table.Row key={milestone.id}>
                    <Menus.Button onClick={() => addMilestone(milestone)}>
                      <div className="flex gap-2 items-center">
                        <span className="grow">{milestone.title}</span>
                        <RadioButton
                          checked={milestone.id === selectedMilestone?.id}
                        />
                      </div>
                    </Menus.Button>
                  </Table.Row>
                ))}
              </Table>
            </Menus.Window>
          </Menus>
        </div>

        <Divider />

        <div className="flex justify-end items-center gap-8">
          <Link to={'/issues?isOpen=open'}>
            <Button size="M" variant="ghosts" flexible type="button">
              <img src={closeIcon} alt="작성 취소" />
              <span>작성 취소</span>
            </Button>
          </Link>

          <Button size="L" variant="contained" type="submit">
            완료
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateIssueForm;
