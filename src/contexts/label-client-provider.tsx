import LabelClientService from '@/services/label/label-client-service';
import { ReactNode, createContext, useState } from 'react';

interface LabelClientContextType {
  client: LabelClientService;
}

interface LabelClientProviderProps {
  client: new () => LabelClientService;
  children: ReactNode;
}

export const LabelClientContex = createContext<LabelClientContextType | null>(
  null
);

export const LabelClientProvider = ({
  client,
  children,
}: LabelClientProviderProps) => {
  const [clientInstance] = useState(() => {
    return new client();
  });

  return (
    <LabelClientContex.Provider value={{ client: clientInstance }}>
      {children}
    </LabelClientContex.Provider>
  );
};
