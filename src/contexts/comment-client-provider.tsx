import CommentClientService from '@/services/comment/comment-client-service';
import { ReactNode, createContext, useState } from 'react';

interface CommentClientContextType {
  client: CommentClientService;
}

interface CommentClientProviderProps {
  client: new () => CommentClientService;
  children: ReactNode;
}

export const CommentClientContex =
  createContext<CommentClientContextType | null>(null);

export const CommentClientProvider = ({
  client,
  children,
}: CommentClientProviderProps) => {
  const [clientInstance] = useState(() => {
    return new client();
  });

  return (
    <CommentClientContex.Provider value={{ client: clientInstance }}>
      {children}
    </CommentClientContex.Provider>
  );
};
