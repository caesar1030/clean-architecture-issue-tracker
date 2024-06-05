import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useUserClient from '@/hooks/use-user-client';
import { SignupPayload } from '@/domain/model/user/payload';

const useSignup = () => {
  const client = useUserClient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signup, isPending: isCreating } = useMutation({
    mutationFn: (signupData: SignupPayload) => client.signup(signupData),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/issues?isOpen=open', { replace: true });
    },
  });

  return { signup, isCreating };
};

export default useSignup;
