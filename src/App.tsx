import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ServicesProvider } from '@/services/service-provider';
import PageView from '@/router/page-view';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ServicesProvider>
      <QueryClientProvider client={queryClient}>
        <PageView />
      </QueryClientProvider>
    </ServicesProvider>
  );
};

export default App;
