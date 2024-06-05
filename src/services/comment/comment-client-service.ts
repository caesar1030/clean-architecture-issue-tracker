import {
  CreateCommentPayload,
  EditCommentPayload,
} from '@/model/comment/payload';

export default interface CommentClientService {
  createComment(createCommentPayload: CreateCommentPayload): Promise<void>;
  editComment(editCommentPayload: EditCommentPayload): Promise<void>;
}
