import IssueClientService from '@/services/issue/issue-client-service';
import { ReactNode, createContext } from 'react';

interface IssueClientContextType {
  client: IssueClientService;
}

interface IssueClientProviderProps {
  client: IssueClientService;
  children: ReactNode;
}

export const IssueClientContex = createContext<IssueClientContextType | null>(
  null
);

export const IssueClientProvider = ({
  client,
  children,
}: IssueClientProviderProps) => {
  return (
    <IssueClientContex.Provider value={{ client }}>
      {children}
    </IssueClientContex.Provider>
  );
};
