import Table from '@/common-ui/table';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Table> = {
  title: 'component/Table',
  component: Table,
  argTypes: {
    columns: {
      description:
        'CSS grid-template-rows 속성에 직접 적용되는 속성 입니다. <br/> 유효하지 않은 값이 전달되면 의도한대로 작동하지 않을 수 있습니다.',
    },
    size: {
      description: '"S", "L"이 가능합니다.',
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    columns: '200px 1fr',
    size: 'L',
    children: (
      <>
        <Table.Header>
          <div>id</div>
          <div>name</div>
        </Table.Header>
        <Table.Body
          data={[
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ]}
          render={({ id, name }) => (
            <Table.Row key={id}>
              <div>{id}</div>
              <div>{name}</div>
            </Table.Row>
          )}
        />
      </>
    ),
  },
};

export const Empty: Story = {
  args: {
    columns: '200px 1fr',
    size: 'L',
    children: (
      <>
        <Table.Header>
          <div>id</div>
          <div>name</div>
        </Table.Header>
        <Table.Body
          data={[]}
          render={({ id, name }) => (
            <Table.Row key={id}>
              <div>{id}</div>
              <div>{name}</div>
            </Table.Row>
          )}
        />
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    columns: '1fr 1fr 1fr',
    size: 'S',
    children: (
      <>
        <Table.Header>
          <div>id</div>
          <div>name</div>
          <div>description</div>
        </Table.Header>
        <Table.Body
          data={[
            { id: 1, name: 'Item 1', description: 'Description 1' },
            { id: 2, name: 'Item 2', description: 'Description 2' },
          ]}
          render={({ id, name, description }) => (
            <Table.Row key={id}>
              <div>{id}</div>
              <div>{name}</div>
              <div>{description}</div>
            </Table.Row>
          )}
        />
      </>
    ),
  },
};
