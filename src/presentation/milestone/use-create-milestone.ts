import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMilestoneClient from '@/hooks/use-milestone-client';
import { CreateMilestonePayload } from '@/model/milestone/payload';

const useCreateMilestone = () => {
  const client = useMilestoneClient();
  const queryClient = useQueryClient();

  const { mutate: createMilestone, isPending: isCreating } = useMutation({
    mutationFn: (createMilestonePayload: CreateMilestonePayload) =>
      client.createMilestone(createMilestonePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });

  return { createMilestone, isCreating };
};

export default useCreateMilestone;
