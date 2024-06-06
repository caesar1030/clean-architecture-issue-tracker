import MilestoneClientService from '@/services/milestone/milestone-client-service';
import { ReactNode, createContext } from 'react';

interface MilestoneClientContextType {
  client: MilestoneClientService;
}

interface MilestoneClientProviderProps {
  client: MilestoneClientService;
  children: ReactNode;
}

export const MilestoneClientContex =
  createContext<MilestoneClientContextType | null>(null);

export const MilestoneClientProvider = ({
  client,
  children,
}: MilestoneClientProviderProps) => {
 

  return (
    <MilestoneClientContex.Provider value={{ client }}>
      {children}
    </MilestoneClientContex.Provider>
  );
};
