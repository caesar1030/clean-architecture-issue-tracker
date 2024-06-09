import { DeleteMilestonePayload } from '@/services/milestone/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteMilestone = () => {
  const { milestoneService } = useServices();
  const queryClient = useQueryClient();

  const { mutate: deleteMilestone, isPending: isDeleting } = useMutation({
    mutationFn: (deleteMilestonePayload: DeleteMilestonePayload) =>
      milestoneService.deleteMilestone(deleteMilestonePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });

  return { deleteMilestone, isDeleting };
};

export default useDeleteMilestone;
