import CommentService from '@/services/comment/comment-service-impl';
import IssueService from '@/services/issue/issue-service-impl';
import LabelService from '@/services/label/label-service';
import MilestoneService from '@/services/milestone/milestone-service';
import UserService from '@/services/user/user-service-impl';

export interface ServiceRegistry {
  commentService: typeof CommentService;
  issueService: typeof IssueService;
  labelService: typeof LabelService;
  milestoneService: typeof MilestoneService;
  userService: typeof UserService;
}

export class Services {
  constructor(private services: ServiceRegistry) {}

  get issueService(): IssueService {
    return new this.services.issueService();
  }

  get labelService(): LabelService {
    return new this.services.labelService();
  }

  get milestoneService(): MilestoneService {
    return new this.services.milestoneService();
  }

  get commentService(): CommentService {
    return new this.services.commentService();
  }

  get userService(): UserService {
    return new this.services.userService();
  }
}
