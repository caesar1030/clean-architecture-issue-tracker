import { useQuery } from '@tanstack/react-query';
import useUserClient from '@/hooks/use-user-client';

const useUser = () => {
  const client = useUserClient();

  const {
    isLoading,
    data: { data: user } = {},
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => client.getUser(),
    retry: false,
  });

  return {
    isLoading,
    user,
    error,
    isAuthenticated: user?.role === 'authenticated',
  };
};

export default useUser;
