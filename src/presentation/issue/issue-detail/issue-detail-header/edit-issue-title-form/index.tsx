import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import editWhiteIcon from '@/assets/edit-white.svg';
import xBlueIcon from '@/assets/x-blue.svg';
import { IssueResponse } from '@/model/issue/response';
import useEditIssue from '@/presentation/issue/use-edit-issue';
import Input from '@/common-ui/input';
import Button from '@/common-ui/button';

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
  const { handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      title: issue?.title,
    },
  });
  const { editIssue } = useEditIssue();

  const onSubmit: SubmitHandler<FormType> = ({ title }) => {
    editIssue({ id: issue!.id, title });
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
          <img src={xBlueIcon} alt="편집 취소" />
          편집 취소
        </Button>
        <Button size="S" variant="contained" type="submit">
          <img src={editWhiteIcon} alt="편집 완료" />
          편집 완료
        </Button>
      </div>
    </form>
  );
};
export default EditIssueTitleForm;
