import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import plusIcon from '@/assets/plus-white.svg';
import useCreateMilestone from '@/presentation/milestone/use-create-milestone';
import { CreateMilestonePayload } from '@/model/milestone/payload';
import Table from '@/common-ui/table';
import Input from '@/common-ui/input';
import Button from '@/common-ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { MilestoneSchema } from '@/schemas/milestone/milestone-schema';
import ErrorMessage from '@/common-ui/error-message';

interface FormType {
  title: string;
  description: string;
  date: string;
}

interface CreateMilestoneFormProps {
  stopEditSession: () => void;
}

const CreateMilestoneForm = ({ stopEditSession }: CreateMilestoneFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<FormType>({
    defaultValues: {
      title: '마일스톤',
      date: '',
      description: '',
    },
    resolver: zodResolver(MilestoneSchema),
    mode: 'onChange',
  });
  const { createMilestone, isCreating } = useCreateMilestone();

  const onSubmit: SubmitHandler<FormType> = ({ date, description, title }) => {
    const toCreate: CreateMilestonePayload = {
      title,
    };
    if (description) toCreate.description = description;
    if (date) {
      const [y, m, d] = date.split('.').map(Number);
      toCreate.date = new Date(y, m - 1, d);
    }
    createMilestone(toCreate, {
      onSuccess: () => stopEditSession(),
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
    <Table size="L" columns="1fr">
      <Table.Row>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <span className="text-neutral-text-strong text-L font-bold">
            새로운 마일스톤 추가
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

          <div className="flex justify-end">
            <Button
              size="S"
              variant="contained"
              type="submit"
              disabled={isCreating || !isValid}
            >
              <img width={16} height={16} src={plusIcon} alt="마일스톤 생성" />
              <span>완료</span>
            </Button>
          </div>
        </form>
      </Table.Row>
    </Table>
  );
};

export default CreateMilestoneForm;
