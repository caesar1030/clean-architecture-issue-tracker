import { DeleteIssuePayload } from '@/services/issue/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteIssue = () => {
  const { issueService } = useServices();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteIssue, isPending: isDeleting } = useMutation({
    mutationFn: (deleteIssuePayload: DeleteIssuePayload) =>
      issueService.deleteIssue(deleteIssuePayload),
    onSuccess: () => {
      navigate('/issues?isOpen=open');
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { deleteIssue, isDeleting };
};

export default useDeleteIssue;
