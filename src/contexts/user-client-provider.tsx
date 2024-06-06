import UserClientService from '@/services/user/user-client-service';
import { ReactNode, createContext } from 'react';

interface UserClientContextType {
  client: UserClientService;
}

interface UserClientProviderProps {
  client: UserClientService;
  children: ReactNode;
}

export const UserClientContex = createContext<UserClientContextType | null>(
  null
);

export const UserClientProvider = ({
  client,
  children,
}: UserClientProviderProps) => {
  return (
    <UserClientContex.Provider value={{ client }}>
      {children}
    </UserClientContex.Provider>
  );
};
