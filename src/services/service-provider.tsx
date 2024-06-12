import { Services } from '@/services/services';
import { ReactNode, createContext, useContext, useState } from 'react';

interface ServicesContextType {
  services: Services;
}

interface ServicesProviderProps {
  children: ReactNode;
}

export const ServicesContext = createContext<ServicesContextType | null>(null);

export const ServicesProvider = ({ children }: ServicesProviderProps) => {
  const [services] = useState(() => new Services());

  return (
    <ServicesContext.Provider value={{ services }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) throw new Error('useServices가 ServicesProvider 외부에서 사용');

  return context.services;
};
