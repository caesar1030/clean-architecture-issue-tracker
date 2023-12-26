import { inject, injectable } from 'inversify';
import { TYPES } from '../../../di/types';
import type {
  CommentCreationData,
  CommentRepository,
} from '../../repository/comment-repository';

export interface CreateCommentUseCase {
  invoke: (newComment: CommentCreationData) => Promise<void>;
}

@injectable()
export class CreateComment implements CreateCommentUseCase {
  private _commentRepo: CommentRepository;

  constructor(@inject(TYPES.CommentRepository) commentRepo: CommentRepository) {
    this._commentRepo = commentRepo;
  }

  async invoke(newComment: CommentCreationData) {
    return this._commentRepo.createComment(newComment);
  }
}
