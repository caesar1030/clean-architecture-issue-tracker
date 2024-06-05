import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import editIcon from '@/assets/edit.svg';
import { IssueResponse } from '@/model/issue/response';
import useEditIssue from '@/presentation/issue/use-edit-issue';
import useUser from '@/presentation/auth/use-user';
import EditIssueContentsForm from '@/presentation/issue/issue-detail/issue-contents/edit-issue-contents-form';
import Button from '@/common-ui/button';
import Table from '@/common-ui/table';
import Avatar from '@/common-ui/avatar';
import InformationTag from '@/common-ui/information-tag';
import { getTimeDiff } from '@/utils/helpers';

interface IssueContentsProps {
  issue: IssueResponse['data'] | undefined;
}

interface FormType {
  contents: string;
}

const IssueContents = ({ issue }: IssueContentsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { control, handleSubmit, reset } = useForm<FormType>();
  const { editIssue } = useEditIssue();
  const { user } = useUser();

  const onSubmit: SubmitHandler<FormType> = ({ contents }) => {
    editIssue(
      { id: issue!.id, contents },
      {
        onSettled: () => setIsEditing(false),
      }
    );
  };

  if (isEditing)
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Controller
            name="contents"
            control={control}
            defaultValue={issue?.contents || ''}
            render={({ field }) => (
              <EditIssueContentsForm issue={issue} {...field} />
            )}
          />

          <div className="flex gap-2 justify-end">
            <Button
              size="S"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
              type="button"
            >
              <span>편집 취소</span>
            </Button>
            <Button size="S" variant="contained" type="submit">
              <span>편집 완료</span>
            </Button>
          </div>
        </form>
      </>
    );

  return (
    <>
      <Table columns="1fr" size="L">
        <Table.Header>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Avatar src={issue?.author.avatar} />
              <span className="text-M text-neutral-text-strong">
                {issue?.author.nickname}
              </span>
              <span className="text-M text-neutral-text-weak">
                {issue && getTimeDiff(issue.createdAt)} 전
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <InformationTag variant="writer">작성자</InformationTag>
              {user?.id === issue?.author.id && (
                <Button
                  size="S"
                  variant="ghosts"
                  flexible
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <img width={16} height={16} src={editIcon} alt="편집" />
                  편집
                </Button>
              )}
            </div>
          </div>
        </Table.Header>
        <Table.Row>{issue?.contents || '없음'}</Table.Row>
      </Table>
    </>
  );
};
export default IssueContents;
