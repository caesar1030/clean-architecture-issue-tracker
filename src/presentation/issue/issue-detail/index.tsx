import { useParams } from 'react-router-dom';
import useIssue from '../use-issue';
import { Issue } from '../../../domain/model/issue';
import Table from '../../../common-ui/table';
import CreateCommentForm from './create-comment-form';
import InformationTag from '../../../common-ui/information-tag';
import { timeDiffFromNow } from '../../../utils/helpers';
import IssueDetailHeader from './issue-detail-header';

function IssueDetail() {
  const { id } = useParams();
  const issueId = Number(id) as Issue['id'];
  const { issue } = useIssue(issueId);

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
          <span>{`이 이슈가 ${timeDiffFromNow(issue?.createdAt)}전에 ${
            issue.isOpen ? '열렸습니다' : '닫혔습니다'
          }`}</span>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <Table columns="1fr" size="L">
          <Table.Header>dd</Table.Header>
          <Table.Row>{issue?.contents || '없음'}</Table.Row>
        </Table>

        {issue?.comments &&
          issue?.comments.map((comment) => {
            return (
              <Table columns="1fr" size="L" key={comment.id}>
                <Table.Header>ㅇㅇ</Table.Header>
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
