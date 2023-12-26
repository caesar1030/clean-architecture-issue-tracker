import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../../../../common-ui/input';
import Button from '../../../../../common-ui/button';
import { IssueDetail } from '../../../../../domain/repository/issue-repository';
import useEditTItle from '../../../use-edit-title';

interface FormType {
  title: string;
}

interface EditIssueTitleFormProps {
  issue: IssueDetail['data'] | undefined;
  toggleIsEditingTitle: () => void;
}

function EditIssueTitleForm({
  issue,
  toggleIsEditingTitle,
}: EditIssueTitleFormProps) {
  const { handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      title: issue?.title,
    },
  });
  const { editTitle } = useEditTItle();

  // TODO: 타입 assertion 제거
  const onSubmit: SubmitHandler<FormType> = ({ title }) => {
    editTitle({ id: issue!.id, title });
    toggleIsEditingTitle();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-6">
      <Controller
        name="title"
        control={control}
        render={({ field }) => {
          return (
            <Input
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
          편집 취소
        </Button>
        <Button size="S" variant="contained" type="submit">
          편집 완료
        </Button>
      </div>
    </form>
  );
}
export default EditIssueTitleForm;
