import FilterBar from '@/common-ui/filter-bar';
import Menus from '@/common-ui/menus';
import Table from '@/common-ui/table';
import type { Meta, StoryObj } from '@storybook/react';
import chevronDownIcon from '@/assets/chevron-down.svg';
import Button from '@/common-ui/button';
import CheckIndicator from '@/common-ui/check-indicator';

const meta: Meta<typeof FilterBar> = {
  title: 'component/FilterBar',
  component: FilterBar,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div className="w-full flex justify-center">
        <Story />
      </div>
    ),
  ],
  args: {
    children: (
      <>
        <FilterBar.SearchFilter>검색</FilterBar.SearchFilter>
        <FilterBar.Input />
      </>
    ),
  },
};

export const Example: Story = {
  decorators: [
    (Story) => (
      <div className="w-full flex justify-center">
        <Story />
      </div>
    ),
  ],
  args: {
    children: (
      <>
        <FilterBar.SearchFilter>
          <Menus>
            <Menus.Trigger id="필터" windowPosition="center">
              <Button
                size="M"
                variant="ghosts"
                flexible
                className="px-6 text-neutral-text-weak"
              >
                <span>필터</span>
                <img
                  width={16}
                  height={16}
                  src={chevronDownIcon}
                  alt="filter"
                />
              </Button>
            </Menus.Trigger>

            <Menus.Window id="필터">
              <Table columns="1fr" size="S">
                <Table.Header>이슈 필터</Table.Header>

                <Table.Row>
                  <Menus.Button>
                    <div className="flex gap-2 items-center">
                      <span className="grow">열린 이슈</span>
                      <CheckIndicator checked={true} />
                    </div>
                  </Menus.Button>
                </Table.Row>

                <Table.Row>
                  <Menus.Button>
                    <div className="flex gap-2 items-center">
                      <span className="grow">닫힌 이슈</span>
                      <CheckIndicator checked={false} />
                    </div>
                  </Menus.Button>
                </Table.Row>
              </Table>
            </Menus.Window>
          </Menus>
        </FilterBar.SearchFilter>

        <FilterBar.Input placeholder={'isOpen:open'} />
      </>
    ),
  },
};
