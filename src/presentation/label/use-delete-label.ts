import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { DeleteLabelUseCase } from '../../domain/use-case/labels/delete-label';
import { DeleteLabelPayload } from '../../domain/model/label/payload';

export default function useDeleteLabel() {
  const deleteLabelUseCase = container.get<DeleteLabelUseCase>(
    TYPES.DeleteLabelUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: deleteLabel, isPending: isDeleting } = useMutation({
    mutationFn: (deleteLabelPayload: DeleteLabelPayload) =>
      deleteLabelUseCase.invoke(deleteLabelPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });

  return { deleteLabel, isDeleting };
}
