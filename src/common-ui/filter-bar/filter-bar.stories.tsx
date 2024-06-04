import type { Meta, StoryObj } from '@storybook/react';

import FilterBar from '.';

const meta: Meta<typeof FilterBar> = {
  title: 'component/FilterBar',
  component: FilterBar,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <FilterBar.SearchFilter>검색</FilterBar.SearchFilter>
        <FilterBar.Input />
      </>
    ),
  },
};
