import { EditIssuePayload } from '@/services/issue/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditIssue = () => {
  const { issueService } = useServices();
  const queryClient = useQueryClient();

  const { mutate: editIssue, isPending: isEditing } = useMutation({
    mutationFn: (editIssuePayload: EditIssuePayload) =>
      issueService.editIssue(editIssuePayload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['issues', id] });
    },
  });

  return { editIssue, isEditing };
};

export default useEditIssue;
