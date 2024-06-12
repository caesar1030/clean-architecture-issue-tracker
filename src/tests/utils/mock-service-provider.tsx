import { ServicesContext } from '@/services/service-provider';
import { Services } from '@/services/services';
import { ReactNode } from 'react';

interface MockServicesProviderProps {
  children: ReactNode;
  mockServices: Partial<Services>;
}

export const MockServicesProvider = ({
  children,
  mockServices,
}: MockServicesProviderProps) => {
  const services = {
    ...mockServices,
  } as Services;

  return (
    <ServicesContext.Provider value={{ services }}>
      {children}
    </ServicesContext.Provider>
  );
};
