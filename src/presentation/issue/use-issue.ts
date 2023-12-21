import { useQuery } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { GetIssueUseCase } from '../../domain/use-case/issues/get-issue';
import { Issue } from '../../domain/model/issue';

export default function useIssue(id: Issue['id']) {
  const getIssueUseCase = container.get<GetIssueUseCase>(TYPES.GetIssueUseCase);

  const {
    isLoading,
    data: { data: issue } = {},
    error,
  } = useQuery({
    queryKey: ['issues', id],
    queryFn: () => getIssueUseCase.invoke(id),
  });

  return {
    isLoading,
    issue,
    error,
  };
}
