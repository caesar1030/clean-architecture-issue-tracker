import CommentService from '@/services/comment/comment-service';
import IssueService from '@/services/issue/issue-service';
import LabelService from '@/services/label/label-service';
import MilestoneService from '@/services/milestone/milestone-service';
import UserService from '@/services/user/user-service';

export interface ServiceRegistry {
  commentService: CommentService;
  issueService: IssueService;
  labelService: LabelService;
  milestoneService: MilestoneService;
  userService: UserService;
}

export class Services {
  constructor(private services: ServiceRegistry) {}

  get issueService(): IssueService {
    return this.services.issueService;
  }

  get labelService(): LabelService {
    return this.services.labelService;
  }

  get milestoneService(): MilestoneService {
    return this.services.milestoneService;
  }

  get commentService(): CommentService {
    return this.services.commentService;
  }

  get userService(): UserService {
    return this.services.userService;
  }
}
