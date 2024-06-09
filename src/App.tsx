import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ServiceProvider } from '@/services/service-provider';
import IssueService from '@/services/issue/issue-service-impl';
import LabelService from '@/services/label/label-service';
import MilestoneService from '@/services/milestone/milestone-service';
import UserService from '@/services/user/user-service-impl';
import CommentService from '@/services/comment/comment-service-impl';
import PageView from '@/router/page-view';

const queryClient = new QueryClient();

const App = () => {
  const issueService = IssueService;
  const commentService = CommentService;
  const labelService = LabelService;
  const milestoneService = MilestoneService;
  const userService = UserService;

  return (
    <ServiceProvider
      serviceRegistry={{
        issueService,
        commentService,
        labelService,
        milestoneService,
        userService,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <PageView />
      </QueryClientProvider>
    </ServiceProvider>
  );
};

export default App;
