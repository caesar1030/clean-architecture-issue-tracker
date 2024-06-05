import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DeleteIssuePayload } from '@/model/issue/payload';
import useIssueClient from '@/hooks/use-issue-client';

const useDeleteIssue = () => {
  const service = useIssueClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteIssue, isPending: isDeleting } = useMutation({
    mutationFn: (deleteIssuePayload: DeleteIssuePayload) =>
      service.deleteIssue(deleteIssuePayload),
    onSuccess: () => {
      navigate('/issues?isOpen=open');
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { deleteIssue, isDeleting };
};

export default useDeleteIssue;
