import { useQuery } from '@tanstack/react-query';
import { useServices } from '@/services/service-provider';

const useMilestones = () => {
  const { milestoneService } = useServices();

  const {
    isLoading,
    data: { data: milestones } = {},
    error,
  } = useQuery({
    queryKey: ['milestones'],
    queryFn: () => milestoneService.getMilestones(),
  });

  return {
    isLoading,
    milestones,
    error,
  };
};

export default useMilestones;
