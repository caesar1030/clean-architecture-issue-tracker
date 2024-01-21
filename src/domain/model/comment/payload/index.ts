import { User } from '@supabase/supabase-js';
import { Issue } from '../../issue/issue';

export interface CreateCommentPayload {
  issueId: Issue['id'];
  contents: string;
  authorId: User['id'];
}
