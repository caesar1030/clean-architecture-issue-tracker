import { useServices } from '@/services/service-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const { userService } = useServices();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isCreating } = useMutation({
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isCreating };
};

export default useLogout;
