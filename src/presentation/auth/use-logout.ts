import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useUserClient from '@/hooks/use-user-client';

const useLogout = () => {
  const client = useUserClient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isCreating } = useMutation({
    mutationFn: () => client.logout(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isCreating };
};

export default useLogout;
