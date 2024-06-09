import { useQuery } from '@tanstack/react-query';
import { useServices } from '@/services/service-provider';

const useLabels = () => {
  const { labelService } = useServices();

  const {
    isLoading,
    data: { data: labels } = { data: [] },
    error,
  } = useQuery({
    queryKey: ['labels'],
    queryFn: () => labelService.getLabels(),
  });

  return {
    isLoading,
    labels,
    error,
  };
};

export default useLabels;
