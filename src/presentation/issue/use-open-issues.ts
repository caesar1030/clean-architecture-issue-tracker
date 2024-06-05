import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OpenIssuesPayload } from '@/model/issue/payload';
import useIssueClient from '@/hooks/use-issue-client';

const useOpenIssues = () => {
  const service = useIssueClient();
  const queryClient = useQueryClient();

  const { mutate: openIssues, isPending: isOpening } = useMutation({
    mutationFn: (openIssuesPayload: OpenIssuesPayload) =>
      service.openIssues(openIssuesPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { openIssues, isOpening };
};

export default useOpenIssues;
