import { CommentCreationData } from '../../domain/repository/comment-repository';

export default interface CommentDataSource {
  createComment(newComment: CommentCreationData): Promise<void>;
}
