import { inject, injectable } from 'inversify';
import { TYPES } from '../../../di/types';
import type { CommentRepository } from '../../repository/comment-repository';
import { EditCommentPayload } from '../../model/comment/payload';

export interface EditCommentUseCase {
  invoke: (editCommentPayload: EditCommentPayload) => Promise<void>;
}

@injectable()
export class EditComment implements EditCommentUseCase {
  private _commentRepo: CommentRepository;

  constructor(@inject(TYPES.CommentRepository) commentRepo: CommentRepository) {
    this._commentRepo = commentRepo;
  }

  async invoke(editCommentPayload: EditCommentPayload) {
    return this._commentRepo.editComment(editCommentPayload);
  }
}
