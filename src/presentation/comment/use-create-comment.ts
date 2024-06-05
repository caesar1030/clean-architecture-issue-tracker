import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCommentClient from '@/hooks/use-comment-client';
import { CreateCommentPayload } from '@/model/comment/payload';

const useCreateComment = () => {
  const client = useCommentClient();
  const queryClient = useQueryClient();

  const { mutate: createComment, isPending: isCreating } = useMutation({
    mutationFn: (createCommentPayload: CreateCommentPayload) =>
      client.createComment(createCommentPayload),
    onSuccess: (_, variables) => {
      const { issueId } = variables;

      queryClient.invalidateQueries({ queryKey: ['issues', issueId] });
    },
  });

  return { createComment, isCreating };
};

export default useCreateComment;
