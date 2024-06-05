import { useParams } from 'react-router-dom';
import trashIcon from '@/assets/trash.svg';
import useIssue from '@/presentation/issue/use-issue';
import useDeleteIssue from '@/presentation/issue/use-delete-issue';
import IssueDetailHeader from '@/presentation/issue/issue-detail/issue-detail-header';
import InformationTag from '@/common-ui/information-tag';
import { getTimeDiff } from '@/utils/helpers';
import Divider from '@/common-ui/divider';
import IssueContents from '@/presentation/issue/issue-detail/issue-contents';
import CommentContents from '@/presentation/comment/comment-contents';
import CreateCommentForm from '@/presentation/issue/issue-detail/create-comment-form';
import IssueDetailSideBar from '@/presentation/issue/issue-detail/issue-detail-side-bar';
import Button from '@/common-ui/button';
import useUser from '@/presentation/auth/use-user';

const IssueDetail = () => {
  const { id } = useParams();
  const issueId = Number(id);
  const { issue } = useIssue({ issueId });
  const { deleteIssue } = useDeleteIssue();
  const { user } = useUser();

  return (
    <>
      <IssueDetailHeader issue={issue} />

      <div className="flex items-center gap-2 text-neutral-text-weak">
        {issue?.isOpen ? (
          <InformationTag variant="open">열린 이슈</InformationTag>
        ) : (
          <InformationTag variant="closed">닫힌 이슈</InformationTag>
        )}
        {issue && (
          <span>{`이 이슈가 ${getTimeDiff(
            issue.createdAt
          )}전에 작성되었습니다 ∙ 코멘트 ${
            issue.comments?.length || 0
          }개`}</span>
        )}
      </div>
      <Divider />

      <div className="grid grid-cols-[19fr_6fr] gap-6">
        <div className="flex flex-col gap-6">
          <IssueContents issue={issue} />

          {issue?.comments &&
            issue?.comments.map((comment) => (
              <CommentContents
                key={comment.id}
                comment={comment}
                issueAuthor={issue.author}
              />
            ))}

          <CreateCommentForm issueId={issueId} />
        </div>

        <div className="flex flex-col gap-4">
          <IssueDetailSideBar issue={issue} />
          {issue?.author.id === user?.id && (
            <Button
              size="S"
              variant="ghosts"
              className="self-end"
              onClick={() => deleteIssue({ id: issue!.id })}
            >
              <img width={16} height={16} src={trashIcon} alt="이슈 삭제" />
              <span className="text-danger-text">이슈 삭제</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default IssueDetail;
