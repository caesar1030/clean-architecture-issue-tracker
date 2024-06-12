import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import refreshIcon from '@/assets/refresh.svg';
import closeIcon from '@/assets/close-blue.svg';
import editIcon from '@/assets/edit-white.svg';
import { generateRandomColor } from '@/utils/helpers';
import useEditLabel from '@/presentation/label/use-edit-labels';
import Table from '@/common-ui/table';
import Input from '@/common-ui/input';
import Button from '@/common-ui/button';
import LabelTag from '@/common-ui/label-tag';
import { zodResolver } from '@hookform/resolvers/zod';
import { LabelSchema } from '@/schemas/label/label-schema';
import ErrorMessage from '@/common-ui/error-message';
import { LabelsResponse } from '@/services/label/response';

export interface EditLabelFormProps {
  label: LabelsResponse['data'][number];
  closeEditingSession: () => void;
}

interface FormType {
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
}

const EditLabelForm = ({ label, closeEditingSession }: EditLabelFormProps) => {
  const { editLabel, isEditing } = useEditLabel();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<FormType>({
    defaultValues: {
      title: label.title,
      description: label.description || '',
      backgroundColor: label.backgroundColor,
      textColor: label.textColor,
    },
    resolver: zodResolver(LabelSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormType> = ({
    title,
    description,
    backgroundColor,
    textColor,
  }) => {
    editLabel(
      {
        id: label.id,
        backgroundColor,
        textColor,
        title,
        description,
      },
      {
        onSuccess: closeEditingSession,
        onError: () =>
          setError('title', { message: '동일한 이름의 라벨이 있습니다.' }),
      }
    );
  };

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
                  error={errors.title?.message}
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
                  error={errors.description?.message}
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
                    className="h-10 w-60"
                    {...field}
                    onChange={(e) => {
                      const newColor = e.target.value.startsWith('#')
                        ? e.target.value
                        : '#' + e.target.value;
                      setValue('backgroundColor', newColor, {
                        shouldValidate: true,
                      });
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
                  setValue('backgroundColor', color, {
                    shouldValidate: true,
                  });
                }}
              >
                <img width={16} height={16} src={refreshIcon} alt="refresh" />
              </Button>
            </div>
            <ErrorMessage>{errors?.backgroundColor?.message}</ErrorMessage>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            onClick={closeEditingSession}
            type="button"
            size="S"
            variant="outline"
          >
            <img width={12} height={12} src={closeIcon} alt="라벨 편집 취소" />
            <span>취소</span>
          </Button>

          <Button
            disabled={isEditing || !isValid}
            type="submit"
            size="S"
            variant="contained"
          >
            <img width={16} height={16} src={editIcon} alt="라벨 편집" />
            <span>편집 완료</span>
          </Button>
        </div>
      </form>
    </Table.Row>
  );
};

export default EditLabelForm;
