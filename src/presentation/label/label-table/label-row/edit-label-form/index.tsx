import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../../../../common-ui/input';
import LabelTag from '../../../../../common-ui/label-tag';
import Table from '../../../../../common-ui/table';
import { LabelsResponse } from '../../../../../domain/model/label/response';

export interface EditLabelFormProps {
  label: LabelsResponse['data'][number];
}

interface FormType {
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
}

const EditLabelForm = ({ label }: EditLabelFormProps) => {
  const { control, handleSubmit } = useForm<FormType>({
    defaultValues: {
      title: label.title,
      description: label.description,
      backgroundColor: label.backgroundColor,
      textColor: label.textColor,
    },
  });

  const onSubmit: SubmitHandler<FormType> = ({
    title,
    description,
    backgroundColor,
    textColor,
  }) => {};

  return (
    <Table.Row>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-span-full flex flex-col gap-6"
      >
        <span className="text-neutral-text-strong text-L font-bold">
          레이블 편집
        </span>

        <div className="flex gap-6">
          <div className="flex-grow-[9] flex justify-center items-center rounded-regular border border-neutral-border">
            <LabelTag
              backgroundColor={label.backgroundColor}
              textColor={label.textColor}
            >
              {label.title}
            </LabelTag>
          </div>

          <div className="flex-grow-[28] flex flex-col gap-4">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="label title"
                  label="레이블 이름"
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
                  label="설명 (선택)"
                  labelPosition="left"
                  className="h-10"
                  placeholder="입력하세요"
                  {...field}
                />
              )}
            />

            <div>
              <Controller
                name="backgroundColor"
                control={control}
                render={({ field }) => (
                  <Input
                    id="label background color"
                    label="배경 색상"
                    labelPosition="left"
                    className="h-10 w-60"
                    {...field}
                  />
                )}
              />
            </div>

            <Input id="" label="" labelPosition="left" />
          </div>
        </div>
      </form>
    </Table.Row>
  );
};
export default EditLabelForm;
