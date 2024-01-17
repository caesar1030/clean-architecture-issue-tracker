import { useParams } from 'react-router-dom';
import useIssue from '../use-issue';
import { Issue } from '../../../domain/model/issue/issue';
import Table from '../../../common-ui/table';
import CreateCommentForm from './create-comment-form';
import InformationTag from '../../../common-ui/information-tag';
import { timeDiffFromNow } from '../../../utils/helpers';
import IssueDetailHeader from './issue-detail-header';
import Avatar from '../../../common-ui/avatar';

function IssueDetail() {
  const { id } = useParams();
  const issueId = Number(id) as Issue['id'];
  const { issue } = useIssue({ issueId });

  return (
    <>
      <IssueDetailHeader issue={issue} />

      <div className="flex items-center gap-2 text-neutral-text-weak">
        {issue?.isOpen ? (
          <InformationTag variant="open">열린 이슈</InformationTag>
        ) : (
          <InformationTag variant="closed">닫힌 이슈</InformationTag>
        )}
        {issue?.createdAt && (
          <span>{`이 이슈가 ${timeDiffFromNow(
            issue?.createdAt
          )}전에 작성되었습니다`}</span>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <Table columns="1fr" size="L">
          <Table.Header>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Avatar src={issue?.author.avatar} />
                <span className="text-M text-neutral-text-strong">
                  {issue?.author.nickname}
                </span>
                <span className="text-M text-neutral-text-weak">
                  {issue && timeDiffFromNow(issue.createdAt)} 전
                </span>
              </div>

              <div>
                <InformationTag variant="writer">작성자</InformationTag>
              </div>
            </div>
          </Table.Header>
          <Table.Row>{issue?.contents || '없음'}</Table.Row>
        </Table>

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
                        <InformationTag variant="writer">작성자</InformationTag>
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
    </>
  );
}
export default IssueDetail;
