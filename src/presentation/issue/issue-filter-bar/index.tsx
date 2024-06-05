import { KeyboardEvent, useRef } from 'react';
import chevronDownIcon from '@/assets/chevron-down.svg';
import useSearchParamsHandlers from '@/presentation/issue/use-search-params-handlers';
import FilterBar from '@/common-ui/filter-bar';
import Menus from '@/common-ui/menus';
import Button from '@/common-ui/button';
import Table from '@/common-ui/table';
import RadioButton from '@/common-ui/radio-button';
import usePlaceholder from '@/presentation/issue/issue-filter-bar/use-placeholder';

const IssueFilterBar = () => {
  const {
    setOpenStatusSearchParam,
    convertQueryToParams,
    isOpenStatus,
    isCloseStatus,
  } = useSearchParamsHandlers();
  const placeholder = usePlaceholder();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;

    convertQueryToParams((e.target as HTMLInputElement).value);
    inputRef.current?.blur();
  };

  return (
    <FilterBar>
      <FilterBar.SearchFilter>
        <Menus>
          <Menus.OpenButton id="필터" windowPosition="left">
            <Button
              size="M"
              variant="ghosts"
              flexible
              className="px-6 text-neutral-text-weak"
            >
              <span>필터</span>
              <img src={chevronDownIcon} alt="마일스톤필터" />
            </Button>
          </Menus.OpenButton>

          <Menus.Window id="필터">
            <Table columns="1fr" size="S">
              <Table.Header>이슈 필터</Table.Header>

              <Table.Row>
                <Menus.Button onClick={() => setOpenStatusSearchParam(true)}>
                  <div className="flex gap-2 items-center">
                    <span className="grow">열린 이슈</span>
                    <RadioButton checked={isOpenStatus} />
                  </div>
                </Menus.Button>
              </Table.Row>

              <Table.Row>
                <Menus.Button onClick={() => setOpenStatusSearchParam(false)}>
                  <div className="flex gap-2 items-center">
                    <span className="grow">닫힌 이슈</span>
                    <RadioButton checked={isCloseStatus} />
                  </div>
                </Menus.Button>
              </Table.Row>
            </Table>
          </Menus.Window>
        </Menus>
      </FilterBar.SearchFilter>

      <FilterBar.Input
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    </FilterBar>
  );
};

export default IssueFilterBar;
