import { EditMilestonePayload } from '@/services/milestone/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditMilestone = () => {
  const { milestoneService } = useServices();
  const queryClient = useQueryClient();

  const {
    mutate: editMilestone,
    isPending: isEditing,
    error,
  } = useMutation({
    mutationFn: (editMilestonePayload: EditMilestonePayload) =>
      milestoneService.editMilestone(editMilestonePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });

  return { editMilestone, isEditing, error };
};

export default useEditMilestone;
