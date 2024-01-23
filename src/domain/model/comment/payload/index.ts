import { User } from '@supabase/supabase-js';
import { Issue } from '../../issue/issue';
import { Comment } from '../comment';

export interface CreateCommentPayload {
  issueId: Issue['id'];
  contents: string;
  authorId: User['id'];
}

export interface EditCommentPayload {
  commentId: Comment['id'];
  contents: string;
  authorId: User['id'];
}
