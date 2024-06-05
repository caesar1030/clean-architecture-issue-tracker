import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CreateIssuePayload } from '@/model/issue/payload';
import useIssueClient from '@/hooks/use-issue-client';

const useCreateIssue = () => {
  const service = useIssueClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createIssue, isPending: isCreating } = useMutation({
    mutationFn: (createIssuePayload: CreateIssuePayload) =>
      service.createIssue(createIssuePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      navigate('/issues?isOpen=open');
    },
  });

  return { createIssue, isCreating };
};

export default useCreateIssue;
