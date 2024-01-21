import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { CreateCommentUseCase } from '../../domain/use-case/comments/create-comment';
import { CreateCommentPayload } from '../../domain/model/comment/payload';

export default function useCreateComment() {
  const createCommentUseCase = container.get<CreateCommentUseCase>(
    TYPES.CreateCommentUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: createComment, isPending: isCreating } = useMutation({
    mutationFn: (createCommentPayload: CreateCommentPayload) =>
      createCommentUseCase.invoke(createCommentPayload),
    onSuccess: (_, variables) => {
      const { issueId } = variables;

      queryClient.invalidateQueries({ queryKey: ['issues', issueId] });
    },
  });

  return { createComment, isCreating };
}
