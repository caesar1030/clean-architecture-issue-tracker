import { CommentClientContex } from '@/contexts/comment-client-provider';
import { useContext } from 'react';

const useCommentClient = () => {
  const context = useContext(CommentClientContex);

  if (!context)
    throw new Error('useCommentClient가 CommentClientProvider 외부에서 사용');

  return context.client;
};

export default useCommentClient;
