import { GetIssuePayload } from '@/services/issue/payload';
import { useServices } from '@/services/service-provider';
import { useQuery } from '@tanstack/react-query';

const useIssue = (getIssuePayload: GetIssuePayload) => {
  const { issueService } = useServices();

  const {
    isLoading,
    data: { data: issue } = {},
    error,
  } = useQuery({
    queryKey: ['issues', getIssuePayload.issueId],
    queryFn: () => issueService.getIssue(getIssuePayload),
  });

  return {
    isLoading,
    issue,
    error,
  };
};

export default useIssue;
