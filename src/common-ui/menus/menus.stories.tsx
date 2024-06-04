import type { Meta, StoryObj } from '@storybook/react';

import Menus from '.';

const meta: Meta<typeof Menus> = {
  title: 'component/Menus',
  component: Menus,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Center: Story = {
  args: {
    children: (
      <>
        <Menus.OpenButton id="id1" windowPosition="center">
          <button style={{ border: '1px solid black' }}>click me</button>
        </Menus.OpenButton>

        <Menus.Window id="id1">
          <div style={{ border: '1px solid black' }}>window</div>
        </Menus.Window>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="h-20 w-full flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
};

export const Left: Story = {
  args: {
    children: (
      <>
        <Menus.OpenButton id="id1" windowPosition="left">
          <button style={{ border: '1px solid black' }}>click me</button>
        </Menus.OpenButton>

        <Menus.Window id="id1">
          <div style={{ border: '1px solid black' }}>window</div>
        </Menus.Window>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="h-20 w-full flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
};

export const Right: Story = {
  args: {
    children: (
      <>
        <Menus.OpenButton id="id1" windowPosition="right">
          <button style={{ border: '1px solid black' }}>click me</button>
        </Menus.OpenButton>

        <Menus.Window id="id1">
          <div style={{ border: '1px solid black' }}>window</div>
        </Menus.Window>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="h-20 w-full flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
};
