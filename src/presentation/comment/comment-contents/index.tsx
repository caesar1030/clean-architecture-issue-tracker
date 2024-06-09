import { useState } from 'react';
import useUser from '@/presentation/auth/use-user';
import Button from '@/common-ui/button';
import Table from '@/common-ui/table';
import Avatar from '@/common-ui/avatar';
import { getTimeDiff } from '@/utils/helpers';
import InformationTag from '@/common-ui/information-tag';
import EditCommentContentsForm from '@/presentation/comment/comment-contents/edit-comment-contents-form';
import { IssueResponse } from '@/services/issue/response';
import editIcon from '@/assets/edit.svg';

interface CommentContentsProps {
  comment: NonNullable<IssueResponse['data']['comments']>[number];
  issueAuthor: IssueResponse['data']['author'];
}

const CommentContents = ({ issueAuthor, comment }: CommentContentsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();

  const stopEditing = () => setIsEditing(false);

  if (isEditing)
    return (
      <EditCommentContentsForm
        comment={comment}
        issueAuthor={user!}
        stopEditing={stopEditing}
      />
    );

  return (
    <>
      <Table columns="1fr" size="L">
        <Table.Header>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Avatar src={comment.author.avatar} />
              <span className="text-M text-neutral-text-strong">
                {comment.author.nickname}
              </span>
              <span className="text-M text-neutral-text-weak">
                {getTimeDiff(comment.createdAt)} 전
              </span>
            </div>

            <div className="flex gap-4 items-center">
              {comment.author.id === issueAuthor.id && (
                <InformationTag variant="writer">작성자</InformationTag>
              )}
              {user?.id === comment.author.id && (
                <Button
                  size="S"
                  variant="ghosts"
                  flexible
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <img width={16} height={16} src={editIcon} alt="편집" />
                  편집
                </Button>
              )}
            </div>
          </div>
        </Table.Header>
        <Table.Row>{comment.contents}</Table.Row>
      </Table>
    </>
  );
};

export default CommentContents;
