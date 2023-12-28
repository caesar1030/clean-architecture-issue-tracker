import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './common-ui/app-layout';
import Issues from './pages/Issues';
import NewIssue from './pages/new-issues';
import Issue from './pages/issue';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="issues" />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/issues/:id" element={<Issue />} />
            <Route path="new-issue" element={<NewIssue />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
