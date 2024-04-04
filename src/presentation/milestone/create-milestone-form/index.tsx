import Button from '../../../common-ui/button';
import Input from '../../../common-ui/input';
import Table from '../../../common-ui/table';
import plusIcon from '../../../assets/plus-white.svg';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useCreateMilestone from '../use-create-milestone';
import { CreateMilestonePayload } from '../../../domain/model/milestone/payload';

interface FormType {
  title: string;
  description: string;
  date: string;
}

interface CreateMilestoneFormProps {
  stopEditSession: () => void;
}

function CreateMilestoneForm({ stopEditSession }: CreateMilestoneFormProps) {
  const { control, handleSubmit, setValue } = useForm<FormType>({
    defaultValues: {
      title: '',
      date: '',
      description: '',
    },
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
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    id="title"
                    placeholder="입력하세요"
                    label="이름"
                    labelPosition="left"
                    className="flex-grow"
                    {...field}
                  />
                )}
              />

              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Input
                    id="date"
                    label="완료일(선택)"
                    labelPosition="left"
                    className="flex-grow"
                    {...field}
                    placeholder="YYYY.MM.DD"
                    onChange={(e) => {
                      let { value } = e.target;
                      value = formatString(value);
                      setValue('date', value);
                    }}
                  />
                )}
              />
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
              disabled={isCreating}
            >
              <img src={plusIcon} alt="마일스톤 생성" />
              <span>완료</span>
            </Button>
          </div>
        </form>
      </Table.Row>
    </Table>
  );
}

export default CreateMilestoneForm;
