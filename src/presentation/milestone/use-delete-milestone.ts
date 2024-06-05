import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMilestoneClient from '@/hooks/use-milestone-client';
import { DeleteMilestonePayload } from '@/domain/model/milestone/payload';

const useDeleteMilestone = () => {
  const client = useMilestoneClient();
  const queryClient = useQueryClient();

  const { mutate: deleteMilestone, isPending: isDeleting } = useMutation({
    mutationFn: (deleteMilestonePayload: DeleteMilestonePayload) =>
      client.deleteMilestone(deleteMilestonePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });

  return { deleteMilestone, isDeleting };
};

export default useDeleteMilestone;
