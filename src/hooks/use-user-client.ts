import { UserClientContex } from '@/contexts/user-client-provider';
import { useContext } from 'react';

const useUserClient = () => {
  const context = useContext(UserClientContex);

  if (!context)
    throw new Error('useIssueClient가 IssueClientProvider 외부에서 사용');

  return context.client;
};

export default useUserClient;
