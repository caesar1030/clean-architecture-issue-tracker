import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateMilestonePayload } from '@/services/milestone/payload';
import { useServices } from '@/services/service-provider';

const useCreateMilestone = () => {
  const { milestoneService } = useServices();
  const queryClient = useQueryClient();

  const { mutate: createMilestone, isPending: isCreating } = useMutation({
    mutationFn: (createMilestonePayload: CreateMilestonePayload) =>
      milestoneService.createMilestone(createMilestonePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });

  return { createMilestone, isCreating };
};

export default useCreateMilestone;
