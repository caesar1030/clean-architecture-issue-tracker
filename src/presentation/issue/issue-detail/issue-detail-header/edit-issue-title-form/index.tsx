import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import editWhiteIcon from '@/assets/edit-white.svg';
import xBlueIcon from '@/assets/x-blue.svg';
import { IssueResponse } from '@/services/issue/response';
import useEditIssue from '@/presentation/issue/use-edit-issue';
import Input from '@/common-ui/input';
import Button from '@/common-ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueSchema } from '@/schemas/issue/issue-schema';
import ErrorMessage from '@/common-ui/error-message';

interface FormType {
  title: string;
}

interface EditIssueTitleFormProps {
  issue: IssueResponse['data'] | undefined;
  toggleIsEditingTitle: () => void;
}

const EditIssueTitleForm = ({
  issue,
  toggleIsEditingTitle,
}: EditIssueTitleFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormType>({
    defaultValues: {
      title: issue?.title,
    },
    resolver: zodResolver(IssueSchema.pick({ title: true })),
    mode: 'onChange',
  });
  const { editIssue } = useEditIssue();

  const onSubmit: SubmitHandler<FormType> = ({ title }) => {
    editIssue({ id: issue!.id, title });
    toggleIsEditingTitle();
  };

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-6"
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => {
            return (
              <Input
                id="title"
                label="제목"
                labelPosition="left"
                className="grow h-10"
                {...field}
              />
            );
          }}
        />

        <div className="flex gap-2">
          <Button
            size="S"
            variant="outline"
            type="button"
            onClick={toggleIsEditingTitle}
          >
            <img width={16} height={16} src={xBlueIcon} alt="편집 취소" />
            편집 취소
          </Button>
          <Button
            size="S"
            variant="contained"
            type="submit"
            disabled={!isValid}
          >
            <img width={16} height={16} src={editWhiteIcon} alt="편집 완료" />
            편집 완료
          </Button>
        </div>
      </form>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
    </div>
  );
};
export default EditIssueTitleForm;
