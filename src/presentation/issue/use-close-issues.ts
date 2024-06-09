import { CloseIssuesPayload } from '@/services/issue/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCloseIssues = () => {
  const { issueService } = useServices();

  const queryClient = useQueryClient();

  const { mutate: closeIssues, isPending: isClosing } = useMutation({
    mutationFn: (closeIssuesPayload: CloseIssuesPayload) =>
      issueService.closeIssues(closeIssuesPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { closeIssues, isClosing };
};

export default useCloseIssues;
