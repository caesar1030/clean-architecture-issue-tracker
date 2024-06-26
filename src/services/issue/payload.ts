import { Issue } from '@/services/issue/issue';
import { Label } from '@/services/label/label';
import { Milestone } from '@/services/milestone/milestone';
import { User } from '@/services/user/user';

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

export interface DeleteIssuePayload {
  id: Issue['id'];
}

export interface EditIssuePayload {
  id: Issue['id'];
  title?: string;
  contents?: string;
  labelId?: Label['id'] | null;
  milestoneId?: Milestone['id'] | null;
  assigneeId?: User['id'] | null;
}
