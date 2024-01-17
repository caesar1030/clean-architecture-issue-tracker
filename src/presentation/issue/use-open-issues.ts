import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OpenIssuesUseCase } from '../../domain/use-case/issues/open-issues';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { OpenIssuesPayload } from '../../domain/model/issue/payload';

export default function useOpenIssues() {
  const openIssuesUseCase = container.get<OpenIssuesUseCase>(
    TYPES.OpenIssuesUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: openIssues, isPending: isOpening } = useMutation({
    mutationFn: (openIssuesPayload: OpenIssuesPayload) =>
      openIssuesUseCase.invoke(openIssuesPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { openIssues, isOpening };
}
