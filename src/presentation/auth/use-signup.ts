import { useServices } from '@/services/service-provider';
import { SignupPayload } from '@/services/user/payload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  const { userService } = useServices();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signup, isPending: isCreating } = useMutation({
    mutationFn: (signupData: SignupPayload) => userService.signup(signupData),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/issues?isOpen=open', { replace: true });
    },
  });

  return { signup, isCreating };
};

export default useSignup;
