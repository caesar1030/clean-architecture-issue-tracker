import { Link } from 'react-router-dom';
import Checkbox from '../../../../common-ui/checkbox';
import LabelTag from '../../../../common-ui/label-tag';
import Table from '../../../../common-ui/table';
import { timeDiffFromNow } from '../../../../utils/helpers';
import { useSelectedIssues } from '../selected-issues-context';
import Avatar from '../../../../common-ui/avatar';
import { IssuesResponse } from '../../../../domain/model/issue/response';
import issueIcon from '../../../../assets/issue.svg';
import milestoneIcon from '../../../../assets/milestone.svg';

interface IssueRowProps {
  issue: IssuesResponse['data'][number];
}

function IssueRow({ issue }: IssueRowProps) {
  const { id, title, createdAt, label, milestone, author } = issue;
  const { selectedIssueIds, toggleIssueSelection } = useSelectedIssues();

  return (
    <Table.Row className="flex items-center">
      <Checkbox
        checked={selectedIssueIds.includes(id)}
        onChange={() => toggleIssueSelection(id)}
      />

      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <img src={issueIcon} alt="이슈" />
          <Link to={`/issues/${id}`}>
            <span className="text-neutral-text-strong font-bold">{title}</span>
          </Link>

          {label && (
            <LabelTag
              textColor={label.textColor}
              backgroundColor={label.backgroundColor}
              key={id}
            >
              {label.title}
            </LabelTag>
          )}
        </div>

        <div className="flex gap-4 text-neutral-text-weak">
          <span># {id}</span>
          <span>{`${timeDiffFromNow(createdAt)} 전에 작성되었습니다`}</span>
          {milestone && (
            <div className="flex gap-2">
              <img src={milestoneIcon} alt="마일스톤" />
              <span>{milestone.title}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <Avatar src={author.avatar} />
      </div>
    </Table.Row>
  );
}
export default IssueRow;
