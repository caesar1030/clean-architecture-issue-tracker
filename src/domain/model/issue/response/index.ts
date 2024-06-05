import { Comment } from '@/domain/model/comment/comment';
import { Issue } from '@/domain/model/issue/issue';
import { Label } from '@/domain/model/label/label';
import { Milestone } from '@/domain/model/milestone/milestone';
import { User } from '@/domain/model/user/user';

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
