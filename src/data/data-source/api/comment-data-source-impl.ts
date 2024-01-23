import { injectable } from 'inversify';
import CommentDataSource from '../comment-data-source';

import supabase from './supabase-db/supabase';
import {
  CreateCommentPayload,
  EditCommentPayload,
} from '../../../domain/model/comment/payload';

@injectable()
export default class CommentDataSourceImple implements CommentDataSource {
  async createComment({ issueId, contents, authorId }: CreateCommentPayload) {
    const { error } = await supabase.from('comments').insert({
      issue_id: issueId,
      contents,
      author_id: authorId,
    });

    if (error) throw new Error('코멘트를 생성하지 못했습니다.');

    return;
  }

  async editComment(editCommentPayload: EditCommentPayload): Promise<void> {
    const { authorId, commentId, contents } = editCommentPayload;

    const toUpdate = {
      id: commentId,
      author_id: authorId,
      contents,
    };

    await supabase.from('comments').update(toUpdate).eq('id', commentId);
  }
}
