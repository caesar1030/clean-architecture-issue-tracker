import LabelClientService from '@/services/label/label-client-service';
import { ReactNode, createContext } from 'react';

interface LabelClientContextType {
  client: LabelClientService;
}

interface LabelClientProviderProps {
  client: LabelClientService;
  children: ReactNode;
}

export const LabelClientContex = createContext<LabelClientContextType | null>(
  null
);

export const LabelClientProvider = ({
  client,
  children,
}: LabelClientProviderProps) => {
  return (
    <LabelClientContex.Provider value={{ client }}>
      {children}
    </LabelClientContex.Provider>
  );
};
