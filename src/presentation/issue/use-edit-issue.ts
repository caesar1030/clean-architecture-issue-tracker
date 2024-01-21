import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { EditIssueUseCase } from '../../domain/use-case/issues/edit-issue';
import { EditIssuePayload } from '../../domain/model/issue/payload';

export default function useEditIssue() {
  const editIssueUseCase = container.get<EditIssueUseCase>(
    TYPES.EditIssueUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: editIssue, isPending: isEditing } = useMutation({
    mutationFn: (editIssuePayload: EditIssuePayload) =>
      editIssueUseCase.invoke(editIssuePayload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['issues', id] });
    },
  });

  return { editIssue, isEditing };
}
