import { useQuery } from '@tanstack/react-query';
import useMilestoneClient from '@/hooks/use-milestone-client';

const useMilestones = () => {
  const client = useMilestoneClient();

  const {
    isLoading,
    data: { data: milestones } = {},
    error,
  } = useQuery({
    queryKey: ['milestones'],
    queryFn: () => client.getMilestones(),
  });

  return {
    isLoading,
    milestones,
    error,
  };
};

export default useMilestones;
