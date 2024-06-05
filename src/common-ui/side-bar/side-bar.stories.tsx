import SideBar from '@/common-ui/side-bar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SideBar> = {
  title: 'component/SideBar',
  component: SideBar,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: [<div>1</div>, <div>2</div>, <div>3</div>],
  },
};
