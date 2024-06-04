import {
  CreateCommentPayload,
  EditCommentPayload,
} from '@/domain/model/comment/payload';
import CommentClientService from './comment-client-service';
import supabase from '@/data/data-source/api/supabase-db/supabase';

export default class CommentClient implements CommentClientService {
  async createComment({
    issueId,
    contents,
    authorId,
  }: CreateCommentPayload): Promise<void> {
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

    const { error } = await supabase
      .from('comments')
      .update(toUpdate)
      .eq('id', commentId);

    if (error) throw new Error('코멘트를 수정하지 못했습니다.');

    return;
  }
}
