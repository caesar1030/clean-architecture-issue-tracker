import CommentClientService from '@/services/comment/comment-client-service';
import { ReactNode, createContext } from 'react';

interface CommentClientContextType {
  client: CommentClientService;
}

interface CommentClientProviderProps {
  client: CommentClientService;
  children: ReactNode;
}

export const CommentClientContex =
  createContext<CommentClientContextType | null>(null);

export const CommentClientProvider = ({
  client,
  children,
}: CommentClientProviderProps) => {
  return (
    <CommentClientContex.Provider value={{ client }}>
      {children}
    </CommentClientContex.Provider>
  );
};
