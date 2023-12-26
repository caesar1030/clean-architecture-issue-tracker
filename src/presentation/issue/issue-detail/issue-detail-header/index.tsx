import { useState } from 'react';
import { IssueDetail } from '../../../../domain/repository/issue-repository';
import IssueTitle from './issue-title';
import Button from '../../../../common-ui/button';
import EditIssueTitleForm from './edit-issue-title-form';

interface IssueDetailHeaderProps {
  issue: IssueDetail['data'] | undefined;
}

function IssueDetailHeader({ issue }: IssueDetailHeaderProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

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
        <Button size="S" variant="outline">
          이슈 닫기
        </Button>
      </div>
    </div>
  );
}
export default IssueDetailHeader;
