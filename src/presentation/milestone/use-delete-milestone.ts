import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { DeleteMilestonePayload } from '../../domain/model/milestone/payload';
import { DeleteMilestoneUseCase } from '../../domain/use-case/milestones/delete-milestone';

export default function useDeleteMilestone() {
  const deleteMilestoneUseCase = container.get<DeleteMilestoneUseCase>(
    TYPES.DeleteMilestoneUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: deleteMilestone, isPending: isDeleting } = useMutation({
    mutationFn: (deleteMilestonePayload: DeleteMilestonePayload) =>
      deleteMilestoneUseCase.invoke(deleteMilestonePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });

  return { deleteMilestone, isDeleting };
}
