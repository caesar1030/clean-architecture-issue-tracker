import Checkbox from '@/common-ui/checkbox';
import { IssuesResponse } from '@/services/issue/response';
import AssigneeFilterMenu from '@/presentation/issue/issue-table/issue-header/assignee-filter-menu';
import AuthorFilterMenu from '@/presentation/issue/issue-table/issue-header/author-filter-menu';
import LabelFilterMenu from '@/presentation/issue/issue-table/issue-header/label-filter-menu';
import MilestoneFilterMenu from '@/presentation/issue/issue-table/issue-header/milestone-filter-menu';
import StatusFilterButtons from '@/presentation/issue/issue-table/issue-header/status-filter-buttons';
import StatusUpdateMenu from '@/presentation/issue/issue-table/issue-header/status-update-menu';
import { useSelectedIssues } from '@/presentation/issue/issue-table/selected-issues-context';

interface IssueHeaderProps {
  issues: IssuesResponse['data'] | undefined;
  openIssueCount: number | undefined;
  closeIssueCount: number | undefined;
}

const IssueHeader = ({
  issues,
  openIssueCount,
  closeIssueCount,
}: IssueHeaderProps) => {
  const { selectedIssueIds, selectAllIssues, deselectAllIssues } =
    useSelectedIssues();

  if (selectedIssueIds.length)
    return (
      <>
        <Checkbox
          checked={Boolean(selectedIssueIds.length)}
          onChange={() => deselectAllIssues()}
        />

        <span className="flex items-center font-bold text-neutral-text-weak">
          {selectedIssueIds.length}개 이슈 선택
        </span>

        <StatusUpdateMenu />
      </>
    );

  return (
    <>
      <Checkbox
        checked={Boolean(selectedIssueIds.length)}
        onChange={() => selectAllIssues(issues?.map(({ id }) => id) ?? [])}
      />

      <StatusFilterButtons
        openIssueCount={openIssueCount}
        closeIssueCount={closeIssueCount}
      />

      <div className="flex gap-8 ">
        <AssigneeFilterMenu />

        <LabelFilterMenu />

        <MilestoneFilterMenu />

        <AuthorFilterMenu />
      </div>
    </>
  );
};
export default IssueHeader;
