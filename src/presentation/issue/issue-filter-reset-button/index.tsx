import Button from '../../../common-ui/button';
import useSearchParamsHandlers from '../use-search-params-handlers';
import closeIcon from '../../../assets/close-icon.svg';

function IssueFilterResetButton() {
  const {
    isOpenStatus,
    hasLabelSearchParam,
    hasMilestoneSearchParam,
    hasAuthorSearchParam,
    hasAssigneeSearchParam,
    hasLikeSearchParam,
    hasNoSearchParam,
    initSearchParams,
  } = useSearchParamsHandlers();

  // TODO: 로직 제거
  const initialCondition =
    isOpenStatus &&
    !hasLabelSearchParam &&
    !hasMilestoneSearchParam &&
    !hasAuthorSearchParam &&
    !hasAssigneeSearchParam &&
    !hasLikeSearchParam &&
    !hasNoSearchParam;

  function handleClick() {
    initSearchParams();
  }

  if (initialCondition) return null;

  return (
    <Button
      size="S"
      variant="ghosts"
      className="w-fit h-fit"
      onClick={handleClick}
    >
      <img src={closeIcon} alt="닫기" />
      <span>현재의 검색 필터 및 정렬 지우기</span>
    </Button>
  );
}
export default IssueFilterResetButton;
