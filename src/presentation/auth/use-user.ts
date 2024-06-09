import { useServices } from '@/services/service-provider';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  const { userService } = useServices();

  const {
    isLoading,
    data: { data: user } = {},
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getUser(),
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
