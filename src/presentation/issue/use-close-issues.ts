import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { CloseIssuesUseCase } from '../../domain/use-case/issues/close-issues';
import { TYPES } from '../../di/types';
import { CloseIssuesPayload } from '../../domain/model/issue/payload';

export default function useCloseIssues() {
  const closeIssuesUseCase = container.get<CloseIssuesUseCase>(
    TYPES.CloseIssuesUseCase
  );

  const queryClient = useQueryClient();

  const { mutate: closeIssues, isPending: isClosing } = useMutation({
    mutationFn: (closeIssuesPayload: CloseIssuesPayload) =>
      closeIssuesUseCase.invoke(closeIssuesPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { closeIssues, isClosing };
}
