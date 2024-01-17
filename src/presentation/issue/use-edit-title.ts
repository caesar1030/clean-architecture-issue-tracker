import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { EditTitleUseCase } from '../../domain/use-case/issues/edit-title';
import { EditIssueTitlePayload } from '../../domain/model/issue/payload';

export default function useEditTItle() {
  const editTitleUseCase = container.get<EditTitleUseCase>(
    TYPES.EditTitleUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: editTitle, isPending: isEditing } = useMutation({
    mutationFn: (editIssueTitlePayload: EditIssueTitlePayload) =>
      editTitleUseCase.invoke(editIssueTitlePayload),
    onSuccess: (_, { issueId }) => {
      queryClient.invalidateQueries({ queryKey: ['issues', issueId] });
    },
  });

  return { editTitle, isEditing };
}
