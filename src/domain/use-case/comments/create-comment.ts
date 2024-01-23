import { inject, injectable } from 'inversify';
import { TYPES } from '../../../di/types';
import type { CommentRepository } from '../../repository/comment-repository';
import { CreateCommentPayload } from '../../model/comment/payload';

export interface CreateCommentUseCase {
  invoke: (createCommentPayload: CreateCommentPayload) => Promise<void>;
}

@injectable()
export class CreateComment implements CreateCommentUseCase {
  private _commentRepo: CommentRepository;

  constructor(@inject(TYPES.CommentRepository) commentRepo: CommentRepository) {
    this._commentRepo = commentRepo;
  }

  async invoke(createCommentPayload: CreateCommentPayload) {
    return this._commentRepo.createComment(createCommentPayload);
  }
}
