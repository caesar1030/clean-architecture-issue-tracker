import Navbar from '@/common-ui/navbar';
import { LabelClientProvider } from '@/contexts/label-client-provider';
import { MilestoneClientProvider } from '@/contexts/milestone-client-provider';
import LabelClientService from '@/services/label/label-client-service';
import MilestoneClientService from '@/services/milestone/milestone-client-service';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Navbar> = {
  title: 'component/Navbar',
  component: Navbar,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  decorators: [
    (Story) => {
      const milestoneClient: MilestoneClientService = {
        getMilestones: () =>
          Promise.resolve({
            data: [
              {
                id: 1,
                isOpen: true,
                title: 'Release Version 1.0',
                description: 'Finalize all features for the initial release.',
                dueDate: new Date(),
              },
              {
                id: 2,
                isOpen: false,
                title: 'Update UX Design',
                description:
                  'Redesign user interface to improve user experience.',
                dueDate: new Date(),
              },
              {
                id: 3,
                isOpen: true,
                title: 'Fix Backend Bugs',
                description: null,
                dueDate: new Date(),
              },
            ],
          }),
        createMilestone: () => Promise.resolve(),
        deleteMilestone: () => Promise.resolve(),
        editMilestone: () => Promise.resolve(),
      };
      const labelClient: LabelClientService = {
        getLabels: () =>
          Promise.resolve({
            data: [
              {
                id: 1,
                backgroundColor: '#00000',
                textColor: '#FFFFFF',
                createdAt: new Date(),
                description: '설명',
                title: '라벨',
              },
            ],
          }),
        createLabel: () => Promise.resolve(),
        deleteLabel: () => Promise.resolve(),
        editLabel: () => Promise.resolve(),
      };
      const queryclient = new QueryClient();
      return (
        <MemoryRouter>
          <QueryClientProvider client={queryclient}>
            <MilestoneClientProvider client={milestoneClient}>
              <LabelClientProvider client={labelClient}>
                <Story />
              </LabelClientProvider>
            </MilestoneClientProvider>
          </QueryClientProvider>
        </MemoryRouter>
      );
    },
  ],
};
