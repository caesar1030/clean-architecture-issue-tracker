import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { useNavigate } from 'react-router-dom';
import { LogoutUseCase } from '../../domain/use-case/auth/logout';

export default function useLogout() {
  const logoutUseCase = container.get<LogoutUseCase>(TYPES.LogOutUseCase);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isCreating } = useMutation({
    mutationFn: () => logoutUseCase.invoke(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isCreating };
}
