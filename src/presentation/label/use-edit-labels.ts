import { EditLabelPayload } from '@/services/label/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditLabel = () => {
  const { labelService } = useServices();
  const queryClient = useQueryClient();

  const { mutate: editLabel, isPending: isEditing } = useMutation({
    mutationFn: (editLabelPayload: EditLabelPayload) =>
      labelService.editLabel(editLabelPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });

  return { editLabel, isEditing };
};

export default useEditLabel;
