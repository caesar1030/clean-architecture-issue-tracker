import { useMutation, useQueryClient } from '@tanstack/react-query';
import useLabelClient from '@/hooks/use-label-client';
import { DeleteLabelPayload } from '@/model/label/payload';

const useDeleteLabel = () => {
  const client = useLabelClient();
  const queryClient = useQueryClient();

  const { mutate: deleteLabel, isPending: isDeleting } = useMutation({
    mutationFn: (deleteLabelPayload: DeleteLabelPayload) =>
      client.deleteLabel(deleteLabelPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });

  return { deleteLabel, isDeleting };
};

export default useDeleteLabel;
