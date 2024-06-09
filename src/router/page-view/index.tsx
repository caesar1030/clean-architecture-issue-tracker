import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AppLayout from '@/pages/app-layout';
import ProtectedRoute from '@/router/protected-route';
import Issues from '@/pages/issues';
import Login from '@/pages/login';
import Labels from '@/pages/labels';
import Milestones from '@/pages/milestones';
import LoadingSpinner from '@/common-ui/loading-spinner';
import Signup from '@/pages/sign-up';
const Issue = lazy(() => import('@/pages/issue'));
const NewIssue = lazy(() => import('@/pages/new-issue'));

const PageView = () => {
  return (
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
          <Route
            path="/issues/:id"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Issue />
              </Suspense>
            }
          />
          <Route
            path="/new-issue"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NewIssue />
              </Suspense>
            }
          />
          <Route path="/labels" element={<Labels />} />
          <Route path="/milestones" element={<Milestones />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/new-user" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageView;
