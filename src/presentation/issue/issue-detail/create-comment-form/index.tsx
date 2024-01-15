import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useCreateComment from '../../../comment/use-create-comment';
import { Issue } from '../../../../domain/model/issue';
import TextArea from '../../../../common-ui/text-area';
import Button from '../../../../common-ui/button';
import useUser from '../../../auth/use-user';

interface CommentType {
  contents: string;
}

interface CreateCommentFormProps {
  issueId: Issue['id'];
}

function CreateCommentForm({ issueId }: CreateCommentFormProps) {
  const { control, handleSubmit, reset } = useForm<CommentType>({
    defaultValues: {
      contents: '',
    },
  });
  const { createComment } = useCreateComment();
  const { user } = useUser();

  const onSubmit: SubmitHandler<CommentType> = ({ contents }) => {
    createComment(
      { issueId, contents, authorId: user!.id },
      { onSuccess: () => reset() }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Controller
        name="contents"
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
