import MilestoneClientService from '@/services/milestone/milestone-client-service';
import { ReactNode, createContext, useState } from 'react';

interface MilestoneClientContextType {
  client: MilestoneClientService;
}

interface MilestoneClientProviderProps {
  client: new () => MilestoneClientService;
  children: ReactNode;
}

export const MilestoneClientContex =
  createContext<MilestoneClientContextType | null>(null);

export const MilestoneClientProvider = ({
  client,
  children,
}: MilestoneClientProviderProps) => {
  const [clientInstance] = useState(() => {
    return new client();
  });

  return (
    <MilestoneClientContex.Provider value={{ client: clientInstance }}>
      {children}
    </MilestoneClientContex.Provider>
  );
};
