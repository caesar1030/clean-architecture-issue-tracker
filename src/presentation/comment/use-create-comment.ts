import { CreateCommentPayload } from '@/services/comment/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateComment = () => {
  const { commentService } = useServices();
  const queryClient = useQueryClient();

  const { mutate: createComment, isPending: isCreating } = useMutation({
    mutationFn: (createCommentPayload: CreateCommentPayload) =>
      commentService.createComment(createCommentPayload),
    onSuccess: (_, variables) => {
      const { issueId } = variables;

      queryClient.invalidateQueries({ queryKey: ['issues', issueId] });
    },
  });

  return { createComment, isCreating };
};

export default useCreateComment;
