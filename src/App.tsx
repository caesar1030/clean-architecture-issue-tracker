import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './common-ui/app-layout';
import Issues from './pages/Issues';
import NewIssue from './pages/new-issues';
import Issue from './pages/issue';
import Login from './pages/login';
import ProtectedRoute from './common-ui/protected-route';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate replace to="/issues?isOpen=open" />}
            />
            <Route path="/issues" element={<Issues />} />
            <Route path="/issues/:id" element={<Issue />} />
            <Route path="/new-issue" element={<NewIssue />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
