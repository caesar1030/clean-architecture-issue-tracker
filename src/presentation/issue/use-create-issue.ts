import { CreateIssuePayload } from '@/services/issue/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useCreateIssue = () => {
  const { issueService } = useServices();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createIssue, isPending: isCreating } = useMutation({
    mutationFn: (createIssuePayload: CreateIssuePayload) =>
      issueService.createIssue(createIssuePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      navigate('/issues?isOpen=open');
    },
  });

  return { createIssue, isCreating };
};

export default useCreateIssue;
