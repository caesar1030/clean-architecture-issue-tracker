import {
  CreateCommentPayload,
  EditCommentPayload,
} from '../model/comment/payload';

export interface CommentRepository {
  createComment(createCommentPayload: CreateCommentPayload): Promise<void>;
  editComment(editCommentPayload: EditCommentPayload): Promise<void>;
}
