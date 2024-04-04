import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { EditMilestoneUseCase } from '../../domain/use-case/milestones/edit-milestone';
import { EditMilestonePayload } from '../../domain/model/milestone/payload';

export default function useEditMilestone() {
  const editMilestoneUseCase = container.get<EditMilestoneUseCase>(
    TYPES.EditMilestoneUseCase
  );
  const queryClient = useQueryClient();

  const {
    mutate: editMilestone,
    isPending: isEditing,
    error,
  } = useMutation({
    mutationFn: (editMilestonePayload: EditMilestonePayload) =>
      editMilestoneUseCase.invoke(editMilestonePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });

  return { editMilestone, isEditing, error };
}
