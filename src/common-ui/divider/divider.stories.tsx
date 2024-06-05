import Divider from '@/common-ui/divider';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Divider> = {
  title: 'component/Divider',
  component: Divider,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 200, border: '1px solid black' }}>
        <div>Above divider</div>
        <Story />
        <div>Below divider</div>
      </div>
    ),
  ],
};
