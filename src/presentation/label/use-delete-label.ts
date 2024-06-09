import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServices } from '@/services/service-provider';
import { DeleteLabelPayload } from '@/services/label/payload';

const useDeleteLabel = () => {
  const { labelService } = useServices();
  const queryClient = useQueryClient();

  const { mutate: deleteLabel, isPending: isDeleting } = useMutation({
    mutationFn: (deleteLabelPayload: DeleteLabelPayload) =>
      labelService.deleteLabel(deleteLabelPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });

  return { deleteLabel, isDeleting };
};

export default useDeleteLabel;
