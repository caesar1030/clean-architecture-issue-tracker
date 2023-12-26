import { Issue } from '../model/issue';

export interface CommentCreationData {
  issueId: Issue['id'];
  contents: string;
}

export interface CommentRepository {
  createComment(newComment: CommentCreationData): Promise<void>;
}
