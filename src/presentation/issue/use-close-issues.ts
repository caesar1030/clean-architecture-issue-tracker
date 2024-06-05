import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CloseIssuesPayload } from '@/model/issue/payload';
import useIssueClient from '@/hooks/use-issue-client';

const useCloseIssues = () => {
  const service = useIssueClient();

  const queryClient = useQueryClient();

  const { mutate: closeIssues, isPending: isClosing } = useMutation({
    mutationFn: (closeIssuesPayload: CloseIssuesPayload) =>
      service.closeIssues(closeIssuesPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { closeIssues, isClosing };
};

export default useCloseIssues;
