import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { CreateLabelPayload } from '../../domain/model/label/payload';
import { CreateLabelUseCase } from '../../domain/use-case/labels/create-label';

export default function useCreateLabel() {
  const createLabelUseCase = container.get<CreateLabelUseCase>(
    TYPES.CreateLabelUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: createLabel, isPending: isCreating } = useMutation({
    mutationFn: (createLabelPayload: CreateLabelPayload) =>
      createLabelUseCase.invoke(createLabelPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });

  return { createLabel, isCreating };
}
