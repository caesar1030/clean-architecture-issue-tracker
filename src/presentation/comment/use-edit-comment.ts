import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { EditCommentUseCase } from '../../domain/use-case/comments/edit-comment';
import { EditCommentPayload } from '../../domain/model/comment/payload';

export default function useEditComment() {
  const editCommentUseCase = container.get<EditCommentUseCase>(
    TYPES.EditCommentUseCase
  );
  const queryClient = useQueryClient();

  const { mutate: editComment, isPending: isEditing } = useMutation({
    mutationFn: (editCommentPayload: EditCommentPayload) =>
      editCommentUseCase.invoke(editCommentPayload),
    onSuccess: () => {
      // TODO: 좀 더 효율적인 방법 (해당 issue만 처리하도록 하는 방법)으로 수정
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { editComment, isEditing };
}
