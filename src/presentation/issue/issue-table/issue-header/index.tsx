import Checkbox from '../../../../common-ui/checkbox';
import { IssuesResponse } from '../../../../domain/model/issue/response';
import { useSelectedIssues } from '../selected-issues-context';
import AssigneeFilterMenu from './assignee-filter-menu';
import AuthorFilterMenu from './author-filter-menu';
import LabelFilterMenu from './label-filter-menu';
import MilestoneFilterMenu from './milestone-filter-menu';
import StatusFilterButtons from './status-filter-buttons';
import StatusUpdateMenu from './status-update-menu';

interface IssueHeaderProps {
  issues: IssuesResponse['data'] | undefined;
  openIssueCount: number | undefined;
  closeIssueCount: number | undefined;
}

function IssueHeader({
  issues,
  openIssueCount,
  closeIssueCount,
}: IssueHeaderProps) {
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
}
export default IssueHeader;
