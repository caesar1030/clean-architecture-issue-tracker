import { CreateCommentPayload } from '../../domain/model/comment/payload';

export default interface CommentDataSource {
  createComment(createCommentPayload: CreateCommentPayload): Promise<void>;
}
