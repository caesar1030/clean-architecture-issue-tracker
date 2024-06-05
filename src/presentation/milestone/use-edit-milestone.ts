import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMilestoneClient from '@/hooks/use-milestone-client';
import { EditMilestonePayload } from '@/domain/model/milestone/payload';

const useEditMilestone = () => {
  const client = useMilestoneClient();
  const queryClient = useQueryClient();

  const {
    mutate: editMilestone,
    isPending: isEditing,
    error,
  } = useMutation({
    mutationFn: (editMilestonePayload: EditMilestonePayload) =>
      client.editMilestone(editMilestonePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });

  return { editMilestone, isEditing, error };
};

export default useEditMilestone;
