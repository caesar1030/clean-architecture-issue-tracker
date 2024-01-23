import { useParams } from 'react-router-dom';
import useIssue from '../use-issue';
import { Issue } from '../../../domain/model/issue/issue';
import Table from '../../../common-ui/table';
import CreateCommentForm from './create-comment-form';
import InformationTag from '../../../common-ui/information-tag';
import { timeDiffFromNow } from '../../../utils/helpers';
import IssueDetailHeader from './issue-detail-header';
import Avatar from '../../../common-ui/avatar';
import Divider from '../../../common-ui/divider';
import IssueDetailSideBar from './issue-detail-side-bar';
import Button from '../../../common-ui/button';
import useDeleteIssue from '../use-delete-issue';
import IssueContents from './issue-contents';

function IssueDetail() {
  const { id } = useParams();
  const issueId = Number(id) as Issue['id'];
  const { issue } = useIssue({ issueId });
  const { deleteIssue } = useDeleteIssue();

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
          <span>{`이 이슈가 ${timeDiffFromNow(
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
            issue?.comments.map((comment) => {
              return (
                <Table columns="1fr" size="L" key={comment.id}>
                  <Table.Header>
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <Avatar src={comment.author.avatar} />
                        <span className="text-M text-neutral-text-strong">
                          {comment.author.nickname}
                        </span>
                        <span className="text-M text-neutral-text-weak">
                          {timeDiffFromNow(comment.createdAt)} 전
                        </span>
                      </div>

                      <div>
                        {comment.author.id === issue.author.id && (
                          <InformationTag variant="writer">
                            작성자
                          </InformationTag>
                        )}
                      </div>
                    </div>
                  </Table.Header>
                  <Table.Row>{comment.contents}</Table.Row>
                </Table>
              );
            })}

          <CreateCommentForm issueId={issueId} />
        </div>

        <div className="flex flex-col gap-4">
          <IssueDetailSideBar issue={issue} />
          <Button
            size="S"
            variant="ghosts"
            className="self-end"
            onClick={() => deleteIssue({ id: issue!.id })}
          >
            <img src="/public/trash.svg" alt="이슈 삭제" />
            <span className="text-danger-text">이슈 삭제</span>
          </Button>
        </div>
      </div>
    </>
  );
}
export default IssueDetail;
