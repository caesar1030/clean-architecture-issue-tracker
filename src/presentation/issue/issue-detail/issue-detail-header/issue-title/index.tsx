import Heading from '../../../../../common-ui/heading';
import { IssueResponse } from '../../../../../domain/model/issue/response';

interface IssueTitleProps {
  issue: IssueResponse['data'] | undefined;
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
