import { Comment } from '@/services/comment/comment';
import { Issue } from '@/services/issue/issue';
import { Label } from '@/services/label/label';
import { Milestone } from '@/services/milestone/milestone';
import { User } from '@/services/user/user';

export interface IssueResponse {
  data: Pick<Issue, 'id' | 'contents' | 'createdAt' | 'isOpen' | 'title'> & {
    label: Pick<Label, 'id' | 'title' | 'textColor' | 'backgroundColor'> | null;
    milestone: Pick<Milestone, 'id' | 'title'> | null;
    comments:
      | (Pick<Comment, 'id' | 'createdAt' | 'contents'> & {
          author: Pick<User, 'id' | 'avatar' | 'nickname'>;
        })[]
      | null;
    author: Pick<User, 'id' | 'nickname' | 'avatar'>;
    assignee: Pick<User, 'id' | 'nickname' | 'avatar'> | null;
  };
}

export interface IssuesResponse {
  data: (Pick<Issue, 'id' | 'title' | 'isOpen' | 'createdAt'> & {
    label: Pick<Label, 'id' | 'title' | 'textColor' | 'backgroundColor'> | null;
    milestone: Pick<Milestone, 'id' | 'title'> | null;
    author: Pick<User, 'id' | 'nickname' | 'avatar'>;
    assignee: Pick<User, 'id' | 'nickname' | 'avatar'> | null;
  })[];
  openIssueCount: number;
  closeIssueCount: number;
}
