import { IssueResponse } from '@/services/issue/response';
import useEditComment from '@/presentation/comment/use-edit-comment';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/common-ui/button';
import EditCommentTextarea from '@/presentation/comment/comment-contents/edit-comment-contents-form/edit-comment-textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentSchema } from '@/schemas/comment/comment-schemat';
import ErrorMessage from '@/common-ui/error-message';

export interface EditIssueContentsFormProps {
  comment: NonNullable<IssueResponse['data']['comments']>[number];
  issueAuthor: IssueResponse['data']['author'];
  stopEditing: () => void;
}
interface FormType {
  contents: string;
}

const EditCommentContentsForm = ({
  comment,
  issueAuthor,
  stopEditing,
}: EditIssueContentsFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormType>({
    defaultValues: {
      contents: comment.contents || '',
    },
    resolver: zodResolver(CommentSchema),
    mode: 'onChange',
  });
  const { editComment } = useEditComment();
  const onSubmit: SubmitHandler<FormType> = ({ contents }) => {
    editComment(
      { authorId: issueAuthor!.id, commentId: comment.id, contents },
      { onSuccess: () => stopEditing() }
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Controller
        name="contents"
        control={control}
        render={({ field }) => (
          <EditCommentTextarea
            issueAuthor={issueAuthor}
            comment={comment}
            {...field}
          />
        )}
      />
      <ErrorMessage>{errors.contents?.message}</ErrorMessage>

      <div className="flex gap-2 justify-end">
        <Button
          size="S"
          variant="outline"
          onClick={() => {
            stopEditing();
            reset();
          }}
          type="button"
        >
          <span>편집 취소</span>
        </Button>
        <Button size="S" variant="contained" type="submit" disabled={!isValid}>
          <span>편집 완료</span>
        </Button>
      </div>
    </form>
  );
};

export default EditCommentContentsForm;
