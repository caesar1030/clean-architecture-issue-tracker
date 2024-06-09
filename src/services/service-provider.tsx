import { ServiceRegistry, Services } from '@/services/services';
import { ReactNode, createContext, useContext, useState } from 'react';

interface ServiceContextType {
  services: Services;
}

interface ServiceProviderProps {
  serviceRegistry: ServiceRegistry;
  children: ReactNode;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

export const ServicesProvider = ({
  serviceRegistry,
  children,
}: ServiceProviderProps) => {
  const [services] = useState(() => new Services(serviceRegistry));

  return (
    <ServiceContext.Provider value={{ services }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error('useServices가 ServicesProvider 외부에서 사용');

  return context.services;
};
