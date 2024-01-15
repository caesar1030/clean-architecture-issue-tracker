import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { CommentCreationData } from '../../domain/repository/comment-repository';
import { CreateCommentUseCase } from '../../domain/use-case/comments/create-comment';

export default function useCreateComment() {
  const createCommentUseCase = container.get<CreateCommentUseCase>(
    TYPES.CreateCommentUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: createComment, isPending: isCreating } = useMutation({
    mutationFn: (newComment: CommentCreationData) =>
      createCommentUseCase.invoke(newComment),
    onSuccess: (_, variables) => {
      const { issueId } = variables;

      queryClient.invalidateQueries({ queryKey: ['issues', issueId] });
    },
  });

  return { createComment, isCreating };
}
