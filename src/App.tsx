import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppLayout from './common-ui/app-layout';
import ProtectedRoute from './common-ui/protected-route';
import Milestones from './pages/milestones';

const Issues = lazy(
  () => import(/* webpackChunkName: "issues" */ './pages/Issues')
);
const NewIssue = lazy(
  () => import(/* webpackChunkName: "new-issue" */ './pages/new-issues')
);

const Issue = lazy(
  () => import(/* webpackChunkName: "issue" */ './pages/issue')
);

const Login = lazy(
  () => import(/* webpackChunkName: "login" */ './pages/login')
);
const Signup = lazy(
  () => import(/* webpackChunkName: "signup" */ './pages/signup')
);
const Labels = lazy(
  () => import(/* webpackChunkName: "labels" */ './pages/labels')
);

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
