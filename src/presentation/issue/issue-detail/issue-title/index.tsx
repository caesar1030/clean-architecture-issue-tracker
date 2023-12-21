import Heading from '../../../../common-ui/heading';
import { IssueDetail } from '../../../../domain/repository/issue-repository';

interface IssueTitleProps {
  issue: IssueDetail['data'] | undefined;
}

function IssueTitle({ issue }: IssueTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <Heading>{issue?.title}</Heading>
      <span className="text-XXL text-neutral-text-weak">#{issue?.id}</span>
    </div>
  );
}
export default IssueTitle;
