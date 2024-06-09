import { OpenIssuesPayload } from '@/services/issue/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useOpenIssues = () => {
  const { issueService } = useServices();
  const queryClient = useQueryClient();

  const { mutate: openIssues, isPending: isOpening } = useMutation({
    mutationFn: (openIssuesPayload: OpenIssuesPayload) =>
      issueService.openIssues(openIssuesPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { openIssues, isOpening };
};

export default useOpenIssues;
