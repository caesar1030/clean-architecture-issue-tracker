import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { CreateIssueUseCase } from '../../domain/use-case/issues/create-issue';
import { useNavigate } from 'react-router-dom';
import { CreateIssuePayload } from '../../domain/model/issue/payload';

export default function useCreateIssue() {
  const createIssueUseCase = container.get<CreateIssueUseCase>(
    TYPES.CreateIssueUseCase
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createIssue, isPending: isCreating } = useMutation({
    mutationFn: (createIssuePayload: CreateIssuePayload) =>
      createIssueUseCase.invoke(createIssuePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      navigate('/issues');
    },
  });

  return { createIssue, isCreating };
}
