import { useServices } from '@/services/service-provider';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
  const { userService } = useServices();

  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });

  return {
    isLoading,
    users,
    error,
  };
};

export default useUsers;
