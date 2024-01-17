import { useQuery } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { GetIssueUseCase } from '../../domain/use-case/issues/get-issue';
import { GetIssuePayload } from '../../domain/model/issue/payload';

export default function useIssue(getIssuePayload: GetIssuePayload) {
  const getIssueUseCase = container.get<GetIssueUseCase>(TYPES.GetIssueUseCase);

  const {
    isLoading,
    data: { data: issue } = {},
    error,
  } = useQuery({
    queryKey: ['issues', getIssuePayload.issueId],
    queryFn: () => getIssueUseCase.invoke(getIssuePayload),
  });

  return {
    isLoading,
    issue,
    error,
  };
}
