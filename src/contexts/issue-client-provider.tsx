import IssueClientService from '@/services/issue/issue-client-service';
import { ReactNode, createContext, useState } from 'react';

interface IssueClientContextType {
  client: IssueClientService;
}

interface IssueClientProviderProps {
  client: new () => IssueClientService;
  children: ReactNode;
}

export const IssueClientContex = createContext<IssueClientContextType | null>(
  null
);

export const IssueClientProvider = ({
  client,
  children,
}: IssueClientProviderProps) => {
  const [clientInstance] = useState(() => {
    return new client();
  });

  return (
    <IssueClientContex.Provider value={{ client: clientInstance }}>
      {children}
    </IssueClientContex.Provider>
  );
};
