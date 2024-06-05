import { useState } from 'react';
import openedMilestoneIcon from '@/assets/opened-milestone.svg';
import closedMilestoneIcon from '@/assets/closed-issue.svg';
import useMilestones from '@/presentation/milestone/use-milestones';
import Table from '@/common-ui/table';
import Button from '@/common-ui/button';
import MilestoneRow from '@/presentation/milestone/milestone-table/milestone-row';

const MilestoneTable = () => {
  const { milestones } = useMilestones();
  const [isOpenMilestones, setIsOpen] = useState(true);

  const openMilestones = milestones?.filter(({ isOpen }) => isOpen);
  const closedMilestones = milestones?.filter(({ isOpen }) => !isOpen);
  let filteredMilestones = isOpenMilestones
    ? openMilestones
    : closedMilestones ?? [];

  return (
    <Table columns="1fr" size="L">
      <Table.Header>
        <div className="flex gap-6">
          <Button
            size="M"
            variant="ghosts"
            flexible
            onClick={() => setIsOpen(true)}
          >
            <img
              width={16}
              height={16}
              src={openedMilestoneIcon}
              alt="열린 마일스톤"
            />
            열린 마일스톤 ({openMilestones?.length})
          </Button>
          <Button
            size="M"
            variant="ghosts"
            flexible
            onClick={() => setIsOpen(false)}
          >
            <img
              width={16}
              height={16}
              src={closedMilestoneIcon}
              alt="닫힌 마일스톤"
            />
            닫힌 마일스톤 ({closedMilestones?.length})
          </Button>
        </div>
      </Table.Header>

      <Table.Body
        data={filteredMilestones}
        render={(milestone) => {
          return <MilestoneRow key={milestone.id} milestone={milestone} />;
        }}
      />
    </Table>
  );
};

export default MilestoneTable;
