import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { CreateMilestoneUseCase } from '../../domain/use-case/milestones/create-milestone';
import { CreateMilestonePayload } from '../../domain/model/milestone/payload';

export default function useCreateMilestone() {
  const createMilestoneUseCase = container.get<CreateMilestoneUseCase>(
    TYPES.CreateMilestoneUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: createMilestone, isPending: isCreating } = useMutation({
    mutationFn: (createLabelPayload: CreateMilestonePayload) =>
      createMilestoneUseCase.invoke(createLabelPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });

  return { createMilestone, isCreating };
}
