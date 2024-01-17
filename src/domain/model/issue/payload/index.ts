import { Label } from '../../label/label';
import { Milestone } from '../../milestone/milestone';
import { User } from '../../user/user';
import { Issue } from '../issue';

export interface GetIssuePayload {
  issueId: Issue['id'];
}

export interface IssuesFilterPayload {
  isOpen?: boolean;
  labelTitle?: string;
  milestoneTitle?: string;
  authorNickname?: string;
  assigneeNickname?: string;
  likes?: string[];
  no?: {
    label?: 'unlabeled';
    milestone?: 'notWithMilestone';
    assignee?: 'assignedToNobody';
  };
}

export interface OpenIssuesPayload {
  issueIds: Issue['id'][];
}

export interface CloseIssuesPayload {
  issueIds: Issue['id'][];
}

export interface CreateIssuePayload {
  title: string;
  contents?: string;
  labelId?: Label['id'];
  milestoneId?: Milestone['id'];
  assigneeId?: User['id'];
  authorId: User['id'];
}

export interface EditIssueTitlePayload {
  issueId: Issue['id'];
  title: string;
}
