import { useQuery } from '@tanstack/react-query';
import { GetIssuePayload } from '@/model/issue/payload';
import useIssueClient from '@/hooks/use-issue-client';

const useIssue = (getIssuePayload: GetIssuePayload) => {
  const service = useIssueClient();

  const {
    isLoading,
    data: { data: issue } = {},
    error,
  } = useQuery({
    queryKey: ['issues', getIssuePayload.issueId],
    queryFn: () => service.getIssue(getIssuePayload),
  });

  return {
    isLoading,
    issue,
    error,
  };
};

export default useIssue;
