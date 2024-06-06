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

import Issues from '@/pages/issues';
import NewIssue from '@/pages/new-issue';
import Issue from '@/pages/issue';
import Login from '@/pages/login';
import Signup from '@/pages/sign-up';
import Labels from '@/pages/labels';
import Milestones from '@/pages/milestones';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserClientProvider client={new UserClient()}>
          <IssueClientProvider client={new IssueClient()}>
            <CommentClientProvider client={new CommentClient()}>
              <MilestoneClientProvider client={new MilestoneClient()}>
                <LabelClientProvider client={new LabelClient()}>
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
