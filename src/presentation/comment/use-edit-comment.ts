import { EditCommentPayload } from '@/services/comment/payload';
import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditComment = () => {
  const { commentService } = useServices();
  const queryClient = useQueryClient();

  const { mutate: editComment, isPending: isEditing } = useMutation({
    mutationFn: (editCommentPayload: EditCommentPayload) =>
      commentService.editComment(editCommentPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { editComment, isEditing };
};

export default useEditComment;
