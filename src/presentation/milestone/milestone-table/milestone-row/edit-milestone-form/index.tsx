import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import closeIcon from '@/assets/close-blue.svg';
import editIcon from '@/assets/edit-white.svg';
import useEditMilestone from '@/presentation/milestone/use-edit-milestone';
import Table from '@/common-ui/table';
import Input from '@/common-ui/input';
import Button from '@/common-ui/button';
import ErrorMessage from '@/common-ui/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { MilestoneSchema } from '@/schemas/milestone/milestone-schema';
import { MilestonesResopnse } from '@/services/milestone/response';
import { EditMilestonePayload } from '@/services/milestone/payload';

interface FormType {
  title: string;
  description: string;
  date: string;
}

interface EditMilestoneFormProps {
  milestone: MilestonesResopnse['data'][number];
  closeEditSession: () => void;
}

const EditMilestoneForm = ({
  milestone: { id, description, dueDate, title },
  closeEditSession,
}: EditMilestoneFormProps) => {
  const { editMilestone, isEditing } = useEditMilestone();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<FormType>({
    defaultValues: {
      title,
      date: dueDate
        ? `${dueDate.getFullYear()}.${dueDate.getMonth()}.${dueDate.getDate()}`
        : '',
      description: description || '',
    },
    resolver: zodResolver(MilestoneSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormType> = ({ date, description, title }) => {
    const toUpdate: EditMilestonePayload = {
      id,
      title,
      description,
    };

    const [y, m, d] = date.split('.').map(Number);
    if (date) toUpdate.date = new Date(y, m - 1, d);

    editMilestone(toUpdate, {
      onSuccess: () => closeEditSession(),
      onError: () =>
        setError('title', { message: '동일한 이름의 마일스톤이 있습니다.' }),
    });
  };

  const formatString = (str: string) => {
    str = str.replace(/[^\d]/g, '');

    if (str.length > 4 && str.length <= 6) {
      str = str.slice(0, 4) + '.' + str.slice(4);
    } else if (str.length > 6) {
      str = str.slice(0, 4) + '.' + str.slice(4, 6) + '.' + str.slice(6, 8);
    }

    return str;
  };

  return (
    <Table.Row>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <span className="text-neutral-text-strong text-L font-bold">
          마일스톤 편집
        </span>

        <div className="flex flex-col gap-4">
          <div className="w-full flex gap-4">
            <div className="flex-grow flex flex-col gap-1">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    id="title"
                    placeholder="입력하세요"
                    label="이름"
                    labelPosition="left"
                    {...field}
                  />
                )}
              />
              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </div>

            <div className="flex-grow flex flex-col gap-1">
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Input
                    id="date"
                    label="완료일(선택)"
                    labelPosition="left"
                    {...field}
                    placeholder="YYYY.MM.DD"
                    onChange={(e) => {
                      const { value } = e.target;
                      const formatted = formatString(value);
                      setValue('date', formatted, { shouldValidate: true });
                    }}
                  />
                )}
              />
              <ErrorMessage>{errors.date?.message}</ErrorMessage>
            </div>
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="입력하세요"
                id="description"
                label="설명(선택)"
                labelPosition="left"
                error={errors.description?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            onClick={closeEditSession}
            type="button"
            size="S"
            variant="outline"
          >
            <img width={12} height={12} src={closeIcon} alt="라벨 편집 취소" />
            <span>취소</span>
          </Button>

          <Button
            size="S"
            variant="contained"
            type="submit"
            disabled={isEditing || !isValid}
          >
            <img width={16} height={16} src={editIcon} alt="마일스톤 생성" />
            <span>완료</span>
          </Button>
        </div>
      </form>
    </Table.Row>
  );
};

export default EditMilestoneForm;
