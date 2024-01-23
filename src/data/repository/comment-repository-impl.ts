import { inject, injectable } from 'inversify';
import { CommentRepository } from '../../domain/repository/comment-repository';
import type CommentDataSource from '../data-source/comment-data-source';
import { TYPES } from '../../di/types';
import {
  CreateCommentPayload,
  EditCommentPayload,
} from '../../domain/model/comment/payload';

@injectable()
export class CommentRepositoryImpl implements CommentRepository {
  private _datasource: CommentDataSource;

  constructor(@inject(TYPES.CommentDataSource) dataSource: CommentDataSource) {
    this._datasource = dataSource;
  }

  async createComment(
    createCommentPayload: CreateCommentPayload
  ): Promise<void> {
    return this._datasource.createComment(createCommentPayload);
  }

  async editComment(editCommentPayload: EditCommentPayload): Promise<void> {
    return this._datasource.editComment(editCommentPayload);
  }
}
