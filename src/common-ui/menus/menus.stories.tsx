import Button from '@/common-ui/button';
import Menus from '@/common-ui/menus';
import type { Meta, StoryObj } from '@storybook/react';

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
        <Menus.Trigger id="id1" windowPosition="center">
          <Button variant="ghosts" flexible>
            Click me
          </Button>
        </Menus.Trigger>

        <Menus.Window id="id1">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: 12,
              width: 250,
              height: 100,
            }}
          >
            window
          </div>
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
        <Menus.Trigger id="id1" windowPosition="left">
          <Button variant="ghosts" flexible>
            Click me
          </Button>
        </Menus.Trigger>

        <Menus.Window id="id1">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: 12,
              width: 250,
              height: 100,
            }}
          >
            window
          </div>
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
        <Menus.Trigger id="id1" windowPosition="right">
          <Button variant="ghosts" flexible>
            Click me
          </Button>
        </Menus.Trigger>

        <Menus.Window id="id1">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: 12,
              width: 250,
              height: 100,
            }}
          >
            window
          </div>
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
