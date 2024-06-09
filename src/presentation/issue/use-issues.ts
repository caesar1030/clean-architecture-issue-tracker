import { useQuery } from '@tanstack/react-query';
import useSearchParamsHandlers from '@/presentation/issue/use-search-params-handlers';
import { useServices } from '@/services/service-provider';

const useIssues = () => {
  const { issueService } = useServices();
  const { getFilterOptions } = useSearchParamsHandlers();
  const filterOptions = getFilterOptions();

  const {
    isLoading,
    data: { data: issues, openIssueCount, closeIssueCount } = {},
    error,
  } = useQuery({
    queryKey: ['issues', filterOptions],
    queryFn: () => issueService.getIssues(filterOptions),
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
