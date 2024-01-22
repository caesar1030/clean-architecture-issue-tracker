import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { useNavigate } from 'react-router-dom';
import { DeleteIssueUseCase } from '../../domain/use-case/issues/delete-issue';
import { DeleteIssuePayload } from '../../domain/model/issue/payload';

export default function useDeleteIssue() {
  const deleteIssueUseCase = container.get<DeleteIssueUseCase>(
    TYPES.DeleteIssueUseCase
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteIssue, isPending: isDeleting } = useMutation({
    mutationFn: (deleteIssuePayload: DeleteIssuePayload) =>
      deleteIssueUseCase.invoke(deleteIssuePayload),
    onSuccess: () => {
      navigate('/issues?isOpen=open');
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { deleteIssue, isDeleting };
}
