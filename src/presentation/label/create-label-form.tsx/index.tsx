import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import refreshIcon from '@/assets/refresh.svg';
import useCreateLabel from '@/presentation/label/use-create-lagel';
import Table from '@/common-ui/table';
import LabelTag from '@/common-ui/label-tag';
import Input from '@/common-ui/input';
import Button from '@/common-ui/button';
import { generateRandomColor } from '@/utils/helpers';

export interface CreateLabelFormProps {
  closeAddSession: () => void;
}

interface FormType {
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
}

const CreateLabelForm = ({ closeAddSession }: CreateLabelFormProps) => {
  const { createLabel, isCreating } = useCreateLabel();
  const { control, handleSubmit, setValue, watch } = useForm<FormType>({
    defaultValues: {
      title: '레이블',
      description: '',
      backgroundColor: '#000000',
      textColor: '#FFF',
    },
  });

  const onSubmit: SubmitHandler<FormType> = ({
    title,
    description,
    backgroundColor,
    textColor,
  }) => {
    createLabel(
      { title, backgroundColor, description, textColor },
      {
        onSuccess: () => closeAddSession(),
      }
    );
  };

  return (
    <Table size="L" columns="1fr">
      <Table.Row>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-span-full flex flex-col gap-6"
        >
          <span className="text-neutral-text-strong text-L font-bold">
            새로운 레이블 추가
          </span>

          <div className="flex gap-6">
            <div className="flex-grow-[9] w-48 flex justify-center items-center rounded-regular border border-neutral-border">
              <LabelTag
                backgroundColor={watch().backgroundColor}
                textColor={watch().textColor}
              >
                {watch().title}
              </LabelTag>
            </div>

            <div className="flex-grow-[28] flex flex-col gap-4">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    id="label title"
                    label="이름"
                    labelPosition="left"
                    className="h10"
                    placeholder="입력하세요"
                    {...field}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input
                    id="label description"
                    label="설명(선택)"
                    labelPosition="left"
                    className="h-10"
                    placeholder="입력하세요"
                    {...field}
                  />
                )}
              />

              <div className="flex items-center gap-2">
                <Controller
                  name="backgroundColor"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="label background color"
                      label="배경 색상"
                      labelPosition="left"
                      className="h-10 w-72"
                      {...field}
                      onChange={(e) => {
                        if (!e.target.value.startsWith('#'))
                          setValue('backgroundColor', '#' + e.target.value);
                        else setValue('backgroundColor', e.target.value);
                      }}
                    />
                  )}
                />
                <Button
                  size="S"
                  variant="ghosts"
                  type="button"
                  flexible
                  onClick={() => {
                    const color = generateRandomColor();
                    setValue('backgroundColor', color);
                  }}
                >
                  <img src={refreshIcon} alt="refresh" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              disabled={isCreating}
              type="submit"
              size="S"
              variant="contained"
            >
              <span>완료</span>
            </Button>
          </div>
        </form>
      </Table.Row>
    </Table>
  );
};

export default CreateLabelForm;
