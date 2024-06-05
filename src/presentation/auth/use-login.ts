import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useUserClient from '@/hooks/use-user-client';
import { LoginPayload } from '@/model/user/payload';

const useLogin = () => {
  const client = useUserClient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: (loginPayload: LoginPayload) => client.login(loginPayload),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/issues?isOpen=open', { replace: true });
    },
  });

  return { login, isCreating, error };
};

export default useLogin;
