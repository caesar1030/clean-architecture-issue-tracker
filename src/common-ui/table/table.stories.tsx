import type { Meta, StoryObj } from '@storybook/react';

import Table from '.';

const meta: Meta<typeof Table> = {
  title: 'component/Table',
  component: Table,
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
