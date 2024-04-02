import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { EditLabelUseCase } from '../../domain/use-case/labels/edit-label';
import { EditLabelPayload } from '../../domain/model/label/payload';

export default function useEditLabel() {
  const editLabelUseCase = container.get<EditLabelUseCase>(
    TYPES.EditlabelUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: editLabel, isPending: isEditing } = useMutation({
    mutationFn: (editLabelPayload: EditLabelPayload) =>
      editLabelUseCase.invoke(editLabelPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });

  return { editLabel, isEditing };
}
