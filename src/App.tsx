import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ServicesProvider } from '@/services/service-provider';
import IssueService from '@/services/issue/issue-service';
import LabelService from '@/services/label/label-service';
import MilestoneService from '@/services/milestone/milestone-service';
import UserService from '@/services/user/user-service';
import CommentService from '@/services/comment/comment-service';
import PageView from '@/router/page-view';

const queryClient = new QueryClient();

const App = () => {
  const issueService = new IssueService();
  const commentService = new CommentService();
  const labelService = new LabelService();
  const milestoneService = new MilestoneService();
  const userService = new UserService();

  return (
    <ServicesProvider
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
    </ServicesProvider>
  );
};

export default App;
