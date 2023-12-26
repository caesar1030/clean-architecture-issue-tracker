import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useCreateComment from '../../../comment/use-create-comment';
import { Issue } from '../../../../domain/model/issue';
import TextArea from '../../../../common-ui/text-area';
import Button from '../../../../common-ui/button';

interface CommentType {
  comment: string;
}

interface CreateCommentFormProps {
  issueId: Issue['id'];
}

function CreateCommentForm({ issueId }: CreateCommentFormProps) {
  const { control, handleSubmit, reset } = useForm<CommentType>({
    defaultValues: {
      comment: '',
    },
  });
  const { createIssue } = useCreateComment();

  const onSubmit: SubmitHandler<CommentType> = ({ comment }) => {
    createIssue({ issueId, contents: comment }, { onSuccess: () => reset() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Controller
        name="comment"
        control={control}
        render={({ field }) => {
          return (
            <TextArea
              label="코멘트를 입력하세요."
              className="h-60"
              {...field}
            />
          );
        }}
      />

      <Button size="S" variant="contained" className="self-end ">
        코멘트 작성
      </Button>
    </form>
  );
}
export default CreateCommentForm;
