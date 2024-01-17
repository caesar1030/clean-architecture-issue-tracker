import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { LoginUseCase } from '../../domain/use-case/auth/login';
import { useNavigate } from 'react-router-dom';
import { LoginPayload } from '../../domain/model/user/payload';

export default function useLogin() {
  const loginUseCase = container.get<LoginUseCase>(TYPES.LoginUseCase);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: (loginPayload: LoginPayload) =>
      loginUseCase.invoke(loginPayload),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/issues?isOpen=open', { replace: true });
    },
  });

  return { login, isCreating, error };
}
