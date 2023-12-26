import { injectable } from 'inversify';
import CommentDataSource from '../comment-data-source';
import { CommentCreationData } from '../../../domain/repository/comment-repository';
import supabase from './supabase-db/supabase';

@injectable()
export default class CommentDataSourceImple implements CommentDataSource {
  async createComment({ issueId, contents }: CommentCreationData) {
    const { error } = await supabase.from('comments').insert({
      issue_id: issueId,
      contents,
    });

    if (error) throw new Error('코멘트를 생성하지 못했습니다.');

    return;
  }
}
