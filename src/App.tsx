import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from '@/pages/app-layout';
import ProtectedRoute from '@/pages/protected-route';
import { IssueClientProvider } from '@/contexts/issue-client-provider';
import IssueClient from '@/services/issue/issue-client';
import { UserClientProvider } from '@/contexts/user-client-provider';
import UserClient from '@/services/user/user-client';
import { CommentClientProvider } from '@/contexts/comment-client-provider';
import CommentClient from '@/services/comment/comment-client';
import { MilestoneClientProvider } from '@/contexts/milestone-client-provider';
import MilestoneClient from '@/services/milestone/milestone-client';
import { LabelClientProvider } from '@/contexts/label-client-provider';
import LabelClient from '@/services/label/label-client';

const Issues = lazy(() => import('@/pages/issues'));
const NewIssue = lazy(() => import('@/pages/new-issue'));
const Issue = lazy(() => import('@/pages/issue'));
const Login = lazy(() => import('@/pages/login'));
const Signup = lazy(() => import('@/pages/sign-up'));
const Labels = lazy(() => import('@/pages/labels'));
const Milestones = lazy(() => import('@/pages/milestones'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserClientProvider client={UserClient}>
          <IssueClientProvider client={IssueClient}>
            <CommentClientProvider client={CommentClient}>
              <MilestoneClientProvider client={MilestoneClient}>
                <LabelClientProvider client={LabelClient}>
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
                </LabelClientProvider>
              </MilestoneClientProvider>
            </CommentClientProvider>
          </IssueClientProvider>
        </UserClientProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
