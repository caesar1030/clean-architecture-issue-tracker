import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../../../../common-ui/input';
import LabelTag from '../../../../../common-ui/label-tag';
import Table from '../../../../../common-ui/table';
import { LabelsResponse } from '../../../../../domain/model/label/response';
import Button from '../../../../../common-ui/button';
import { Label } from '../../../../../domain/model/label/label';
import refreshIcon from '../../../../../assets/refresh.svg';
import closeIcon from '../../../../../assets/close-blue.svg';
import editIcon from '../../../../../assets/edit-white.svg';
import useEditLabel from '../../../use-edit-labels';

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
  const { control, handleSubmit, setValue, watch } = useForm<FormType>({
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
              backgroundColor={
                watch().backgroundColor as Label['backgroundColor']
              }
              textColor={watch().textColor as Label['textColor']}
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
                    className="h-10 w-60"
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
                  const color = `#${Array.from(
                    { length: 6 },
                    () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]
                  ).join('')}`;

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
            onClick={closeEditingSession}
            type="button"
            size="S"
            variant="outline"
          >
            <img src={closeIcon} alt="라벨 편집 취소" />
            <span>취소</span>
          </Button>

          <Button
            disabled={isEditing}
            type="submit"
            size="S"
            variant="contained"
          >
            <img src={editIcon} alt="라벨 편집" />
            <span>편집 완료</span>
          </Button>
        </div>
      </form>
    </Table.Row>
  );
};
export default EditLabelForm;
