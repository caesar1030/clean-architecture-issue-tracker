import { Comment } from '@/model/comment/comment';
import { Issue } from '@/model/issue/issue';
import { User } from '@supabase/supabase-js';

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
