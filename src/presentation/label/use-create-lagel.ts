import { CreateLabelPayload } from '@/services/label/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateLabel = () => {
  const { labelService } = useServices();
  const queryClient = useQueryClient();

  const { mutate: createLabel, isPending: isCreating } = useMutation({
    mutationFn: (createLabelPayload: CreateLabelPayload) =>
      labelService.createLabel(createLabelPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });

  return { createLabel, isCreating };
};

export default useCreateLabel;
