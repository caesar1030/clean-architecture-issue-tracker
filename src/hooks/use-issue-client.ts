import { IssueClientContex } from '@/contexts/issue-client-provider';
import { useContext } from 'react';

const useIssueClient = () => {
  const context = useContext(IssueClientContex);

  if (!context)
    throw new Error('useIssueClient가 IssueClientProvider 외부에서 사용');

  return context.client;
};

export default useIssueClient;
