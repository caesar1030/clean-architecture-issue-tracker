import UserClientService from '@/services/user/user-client-service';
import { ReactNode, createContext, useState } from 'react';

interface UserClientContextType {
  client: UserClientService;
}

interface UserClientProviderProps {
  client: new () => UserClientService;
  children: ReactNode;
}

export const UserClientContex = createContext<UserClientContextType | null>(
  null
);

export const UserClientProvider = ({
  client,
  children,
}: UserClientProviderProps) => {
  const [clientInstance] = useState(() => {
    return new client();
  });

  return (
    <UserClientContex.Provider value={{ client: clientInstance }}>
      {children}
    </UserClientContex.Provider>
  );
};
