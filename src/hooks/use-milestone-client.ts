import { MilestoneClientContex } from '@/contexts/milestone-client-provider';
import { useContext } from 'react';

const useMilestoneClient = () => {
  const context = useContext(MilestoneClientContex);

  if (!context)
    throw new Error(
      'useMilestoneClient가 MilestoneClientProvider 외부에서 사용'
    );

  return context.client;
};

export default useMilestoneClient;
