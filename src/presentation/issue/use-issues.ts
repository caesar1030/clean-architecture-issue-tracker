import { useQuery } from '@tanstack/react-query';
import useIssueClient from '@/hooks/use-issue-client';
import useSearchParamsHandlers from '@/presentation/issue/use-search-params-handlers';

const useIssues = () => {
  const service = useIssueClient();
  const { getFilterOptions } = useSearchParamsHandlers();
  const filterOptions = getFilterOptions();

  const {
    isLoading,
    data: { data: issues, openIssueCount, closeIssueCount } = {},
    error,
  } = useQuery({
    queryKey: ['issues', filterOptions],
    queryFn: () => service.getIssues(filterOptions),
  });

  return {
    isLoading,
    issues,
    openIssueCount,
    closeIssueCount,
    error,
  };
};

export default useIssues;
