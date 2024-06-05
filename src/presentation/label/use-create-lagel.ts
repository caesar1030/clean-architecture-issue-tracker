import { useMutation, useQueryClient } from '@tanstack/react-query';
import useLabelClient from '@/hooks/use-label-client';
import { CreateLabelPayload } from '@/domain/model/label/payload';

const useCreateLabel = () => {
  const client = useLabelClient();
  const queryClient = useQueryClient();

  const { mutate: createLabel, isPending: isCreating } = useMutation({
    mutationFn: (createLabelPayload: CreateLabelPayload) =>
      client.createLabel(createLabelPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });

  return { createLabel, isCreating };
};

export default useCreateLabel;
