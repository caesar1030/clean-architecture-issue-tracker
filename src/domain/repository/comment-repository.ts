import { Issue } from '../model/issue';
import { User } from '../model/user';

export interface CommentCreationData {
  issueId: Issue['id'];
  contents: string;
  authorId: User['id'];
}

export interface CommentRepository {
  createComment(newComment: CommentCreationData): Promise<void>;
}
