import { useServices } from '@/services/service-provider';
import { LoginPayload } from '@/services/user/payload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const { userService } = useServices();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: (loginPayload: LoginPayload) => userService.login(loginPayload),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/issues?isOpen=open', { replace: true });
    },
  });

  return { login, isCreating, error };
};

export default useLogin;
