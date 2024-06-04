import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from '@/common-ui/app-layout';
import ProtectedRoute from '@/common-ui/protected-route';

const Issues = lazy(() => import('@/pages/Issues'));
const NewIssue = lazy(() => import('@/pages/new-issues'));
const Issue = lazy(() => import('@/pages/issue'));
const Login = lazy(() => import('@/pages/login'));
const Signup = lazy(() => import('@/pages/signup'));
const Labels = lazy(() => import('@/pages/labels'));
const Milestones = lazy(() => import('@/pages/milestones'));

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
            <Route path="/labels" element={<Labels />} />
            <Route path="/milestones" element={<Milestones />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/new-user" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
