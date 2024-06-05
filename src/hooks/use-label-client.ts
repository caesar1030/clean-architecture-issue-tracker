import { LabelClientContex } from '@/contexts/label-client-provider';
import { useContext } from 'react';

const useLabelClient = () => {
  const context = useContext(LabelClientContex);

  if (!context)
    throw new Error('useLabelClient가 LabelClientProvider 외부에서 사용');

  return context.client;
};

export default useLabelClient;
