import { useMutation, useQueryClient } from '@tanstack/react-query';
import useLabelClient from '@/hooks/use-label-client';
import { EditLabelPayload } from '@/domain/model/label/payload';

const useEditLabel = () => {
  const client = useLabelClient();
  const queryClient = useQueryClient();

  const { mutate: editLabel, isPending: isEditing } = useMutation({
    mutationFn: (editLabelPayload: EditLabelPayload) =>
      client.editLabel(editLabelPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });

  return { editLabel, isEditing };
};

export default useEditLabel;
