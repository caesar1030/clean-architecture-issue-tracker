import Button from '@/common-ui/button';
import ErrorMessage from '@/common-ui/error-message';
import { IssueResponse } from '@/services/issue/response';
import EditIssueContentsTextArea from '@/presentation/issue/issue-detail/issue-contents/edit-issue-contents-form/edit-issue-contents-textarea';
import useEditIssue from '@/presentation/issue/use-edit-issue';
import { IssueSchema } from '@/schemas/issue/issue-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface EditIssueContentsFormProps {
  issue: IssueResponse['data'] | undefined;
  stopEditing: () => void;
}

interface FormType {
  contents: string;
}

const EditIssueContentsForm = ({
  issue,
  stopEditing,
}: EditIssueContentsFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormType>({
    defaultValues: {
      contents: issue?.contents || '',
    },
    resolver: zodResolver(IssueSchema.pick({ contents: true })),
    mode: 'onChange',
  });
  const { editIssue } = useEditIssue();
  const onSubmit: SubmitHandler<FormType> = ({ contents }) => {
    editIssue(
      { id: issue!.id, contents },
      {
        onSettled: () => stopEditing(),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Controller
        name="contents"
        control={control}
        render={({ field }) => (
          <EditIssueContentsTextArea issue={issue} {...field} />
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

export default EditIssueContentsForm;
