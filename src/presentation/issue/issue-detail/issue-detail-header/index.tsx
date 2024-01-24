import { useState } from 'react';
import IssueTitle from './issue-title';
import Button from '../../../../common-ui/button';
import EditIssueTitleForm from './edit-issue-title-form';
import { IssueResponse } from '../../../../domain/model/issue/response';
import useCloseIssues from '../../use-close-issues';
import useOpenIssues from '../../use-open-issues';

interface IssueDetailHeaderProps {
  issue: IssueResponse['data'] | undefined;
}

function IssueDetailHeader({ issue }: IssueDetailHeaderProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { closeIssues } = useCloseIssues();
  const { openIssues } = useOpenIssues();

  const toggleIsEditingTitle = () => {
    setIsEditingTitle((prev) => !prev);
  };

  if (isEditingTitle)
    return (
      <EditIssueTitleForm
        issue={issue}
        toggleIsEditingTitle={toggleIsEditingTitle}
      />
    );

  return (
    <div className="flex items-center h-14">
      <div className="grow">
        <IssueTitle issue={issue} />
      </div>
      <div className="flex gap-2">
        <Button size="S" variant="outline" onClick={toggleIsEditingTitle}>
          제목 편집
        </Button>
        <Button
          size="S"
          variant="outline"
          onClick={() =>
            issue?.isOpen
              ? closeIssues({ issueIds: [issue!.id] })
              : openIssues({ issueIds: [issue!.id] })
          }
        >
          {issue?.isOpen ? '이슈 닫기' : '이슈 열기'}
        </Button>
      </div>
    </div>
  );
}
export default IssueDetailHeader;
