import { inject, injectable } from 'inversify';
import {
  CommentCreationData,
  CommentRepository,
} from '../../domain/repository/comment-repository';
import type CommentDataSource from '../data-source/comment-data-source';
import { TYPES } from '../../di/types';

@injectable()
export class CommentRepositoryImpl implements CommentRepository {
  private _datasource: CommentDataSource;

  constructor(@inject(TYPES.CommentDataSource) dataSource: CommentDataSource) {
    this._datasource = dataSource;
  }

  async createComment(newComment: CommentCreationData): Promise<void> {
    return this._datasource.createComment(newComment);
  }
}
