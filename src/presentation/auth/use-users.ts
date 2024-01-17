import { useQuery } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { GetUsersUseCase } from '../../domain/use-case/auth/get-users';

export default function useUsers() {
  const getUsersUseCase = container.get<GetUsersUseCase>(TYPES.GetUsersUseCase);

  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersUseCase.invoke(),
  });

  return {
    isLoading,
    users,
    error,
  };
}
