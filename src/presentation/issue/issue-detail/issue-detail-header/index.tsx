import { useState } from 'react';
import editBlueIcon from '@/assets/edit-blue.svg';
import closedBlueIcon from '@/assets/closed-blue.svg';
import { IssueResponse } from '@/services/issue/response';
import useCloseIssues from '@/presentation/issue/use-close-issues';
import useOpenIssues from '@/presentation/issue/use-open-issues';
import EditIssueTitleForm from '@/presentation/issue/issue-detail/issue-detail-header/edit-issue-title-form';
import IssueTitle from '@/presentation/issue/issue-detail/issue-detail-header/issue-title';
import Button from '@/common-ui/button';
import useUser from '@/presentation/auth/use-user';

interface IssueDetailHeaderProps {
  issue: IssueResponse['data'] | undefined;
}

const IssueDetailHeader = ({ issue }: IssueDetailHeaderProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { closeIssues } = useCloseIssues();
  const { openIssues } = useOpenIssues();
  const { user } = useUser();

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
      {issue?.author.id === user?.id && (
        <div className="flex gap-2">
          <Button size="S" variant="outline" onClick={toggleIsEditingTitle}>
            <img width={16} height={16} src={editBlueIcon} alt="제목편집" />
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
            <img width={16} height={16} src={closedBlueIcon} alt="이슈" />
            {issue?.isOpen ? '이슈 닫기' : '이슈 열기'}
          </Button>
        </div>
      )}
    </div>
  );
};
export default IssueDetailHeader;
