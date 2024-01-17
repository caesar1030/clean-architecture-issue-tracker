import { useQuery } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { GetUserUseCase } from '../../domain/use-case/auth/get-user';

export default function useUser() {
  const getUserUseCase = container.get<GetUserUseCase>(TYPES.GetUserUseCase);

  const {
    isLoading,
    data: { data: user } = {},
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserUseCase.invoke(),
  });

  return {
    isLoading,
    user,
    error,
    isAuthenticated: user?.role === 'authenticated',
  };
}
