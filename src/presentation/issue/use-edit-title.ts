import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { EditTitleData } from '../../domain/repository/issue-repository';
import { EditTitleUseCase } from '../../domain/use-case/issues/edit-title';

export default function useEditTItle() {
  const editTitleUseCase = container.get<EditTitleUseCase>(
    TYPES.EditTitleUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: editTitle, isPending: isEditing } = useMutation({
    mutationFn: (editTitleData: EditTitleData) =>
      editTitleUseCase.invoke(editTitleData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['issues', variables.id] });
    },
  });

  return { editTitle, isEditing };
}
