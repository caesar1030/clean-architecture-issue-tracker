import {
  CreateCommentPayload,
  EditCommentPayload,
} from '../../domain/model/comment/payload';

export default interface CommentDataSource {
  createComment(createCommentPayload: CreateCommentPayload): Promise<void>;
  editComment(editCommentPayload: EditCommentPayload): Promise<void>;
}
