import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCommentClient from '@/hooks/use-comment-client';
import { EditCommentPayload } from '@/domain/model/comment/payload';

const useEditComment = () => {
  const client = useCommentClient();
  const queryClient = useQueryClient();

  const { mutate: editComment, isPending: isEditing } = useMutation({
    mutationFn: (editCommentPayload: EditCommentPayload) =>
      client.editComment(editCommentPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return { editComment, isEditing };
};

export default useEditComment;
