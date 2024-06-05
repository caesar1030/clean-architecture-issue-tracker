import { useQuery } from '@tanstack/react-query';
import useLabelClient from '@/hooks/use-label-client';

const useLabels = () => {
  const client = useLabelClient();

  const {
    isLoading,
    data: { data: labels } = { data: [] },
    error,
  } = useQuery({
    queryKey: ['labels'],
    queryFn: () => client.getLabels(),
  });

  return {
    isLoading,
    labels,
    error,
  };
};

export default useLabels;
