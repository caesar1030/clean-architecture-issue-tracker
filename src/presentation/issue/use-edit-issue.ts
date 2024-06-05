import { useMutation, useQueryClient } from '@tanstack/react-query';
import useIssueClient from '@/hooks/use-issue-client';
import { EditIssuePayload } from '@/domain/model/issue/payload';

const useEditIssue = () => {
  const service = useIssueClient();
  const queryClient = useQueryClient();

  const { mutate: editIssue, isPending: isEditing } = useMutation({
    mutationFn: (editIssuePayload: EditIssuePayload) =>
      service.editIssue(editIssuePayload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['issues', id] });
    },
  });

  return { editIssue, isEditing };
};

export default useEditIssue;
