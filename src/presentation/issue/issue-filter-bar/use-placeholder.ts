import useSearchParamsHandlers from '@/presentation/issue/use-search-params-handlers';
import { useState, useEffect } from 'react';

const usePlaceholder = () => {
  const [placeholder, setPlaceholder] = useState('');
  const { convertParamsToQuery } = useSearchParamsHandlers();

  useEffect(() => {
    const newPlaceholder = convertParamsToQuery();
    setPlaceholder(newPlaceholder);
  }, [convertParamsToQuery]);

  return placeholder;
};

export default usePlaceholder;
