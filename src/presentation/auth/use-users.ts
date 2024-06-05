import { useQuery } from '@tanstack/react-query';
import useUserClient from '@/hooks/use-user-client';

const useUsers = () => {
  const client = useUserClient();

  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => client.getUsers(),
  });

  return {
    isLoading,
    users,
    error,
  };
};

export default useUsers;
