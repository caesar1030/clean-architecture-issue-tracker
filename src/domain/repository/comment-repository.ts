import { CreateCommentPayload } from '../model/comment/payload';

export interface CommentRepository {
  createComment(createCommentPayload: CreateCommentPayload): Promise<void>;
}
