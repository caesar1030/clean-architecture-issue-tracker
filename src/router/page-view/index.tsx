import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from '@/pages/app-layout';
import ProtectedRoute from '@/pages/protected-route';

import Issues from '@/pages/issues';
import NewIssue from '@/pages/new-issue';
import Issue from '@/pages/issue';
import Login from '@/pages/login';
import Signup from '@/pages/sign-up';
import Labels from '@/pages/labels';
import Milestones from '@/pages/milestones';

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
          <Route path="/issues/:id" element={<Issue />} />
          <Route path="/new-issue" element={<NewIssue />} />
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
