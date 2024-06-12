import CommentService from '@/services/comment/comment-service';
import IssueService from '@/services/issue/issue-service';
import LabelService from '@/services/label/label-service';
import MilestoneService from '@/services/milestone/milestone-service';
import UserService from '@/services/user/user-service';

const servicesMap = {
  issue: IssueService,
  label: LabelService,
  milestone: MilestoneService,
  comment: CommentService,
  user: UserService,
};

export class Services {
  cachedServices = new Map();

  private getService(serviceName: keyof typeof servicesMap) {
    if (!this.cachedServices.get(serviceName)) {
      this.cachedServices.set(serviceName, new servicesMap[serviceName]());
    }

    return this.cachedServices.get(serviceName);
  }

  get issueService() {
    return this.getService('issue');
  }

  get labelService() {
    return this.getService('label');
  }

  get milestoneService() {
    return this.getService('milestone');
  }

  get commentService() {
    return this.getService('comment');
  }

  get userService() {
    return this.getService('user');
  }
}
