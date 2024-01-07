import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '../../di/inversify.config';
import { TYPES } from '../../di/types';
import { SignupData } from '../../domain/repository/auth-repository';
import { SignupUseCase } from '../../domain/use-case/auth/signup';
import { useNavigate } from 'react-router-dom';

export default function useSignup() {
  const signupUseCase = container.get<SignupUseCase>(TYPES.SignupUseCase);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signup, isPending: isCreating } = useMutation({
    mutationFn: (signupData: SignupData) => signupUseCase.invoke(signupData),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/issues?isOpen=open', { replace: true });
    },
  });

  return { signup, isCreating };
}
