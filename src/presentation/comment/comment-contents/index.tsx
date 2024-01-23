import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useUser from '../../auth/use-user';
import Button from '../../../common-ui/button';
import Table from '../../../common-ui/table';
import Avatar from '../../../common-ui/avatar';
import { IssueResponse } from '../../../domain/model/issue/response';
import { timeDiffFromNow } from '../../../utils/helpers';
import InformationTag from '../../../common-ui/information-tag';
import EditCommentContentsForm from './edit-comment-contents-form';
import useEditComment from '../use-edit-comment';

interface CommentContentsProps {
  comment: NonNullable<IssueResponse['data']['comments']>[number];
  issueAuthor: IssueResponse['data']['author'];
}

function CommentContents({ issueAuthor, comment }: CommentContentsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { control, handleSubmit, reset } = useForm<FormType>();
  const { editComment } = useEditComment();
  const { user } = useUser();

  interface FormType {
    contents: string;
  }

  const onSubmit: SubmitHandler<FormType> = ({ contents }) => {
    editComment(
      { authorId: user!.id, commentId: comment.id, contents },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  if (isEditing)
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Controller
            name="contents"
            control={control}
            defaultValue={comment.contents || ''}
            render={({ field }) => (
              <EditCommentContentsForm
                issueAuthor={issueAuthor}
                comment={comment}
                {...field}
              />
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
              <Avatar src={comment.author.avatar} />
              <span className="text-M text-neutral-text-strong">
                {comment.author.nickname}
              </span>
              <span className="text-M text-neutral-text-weak">
                {timeDiffFromNow(comment.createdAt)} 전
              </span>
            </div>

            <div className="flex gap-4 items-center">
              {comment.author.id === issueAuthor.id && (
                <InformationTag variant="writer">작성자</InformationTag>
              )}
              {user?.id === comment.author.id && (
                <Button
                  size="S"
                  variant="ghosts"
                  flexible
                  onClick={() => setIsEditing(!isEditing)}
                >
                  편집
                </Button>
              )}
            </div>
          </div>
        </Table.Header>
        <Table.Row>{comment.contents}</Table.Row>
      </Table>
    </>
  );
}
export default CommentContents;
