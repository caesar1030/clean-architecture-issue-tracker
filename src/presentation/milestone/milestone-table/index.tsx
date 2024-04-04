import { useState } from 'react';
import Button from '../../../common-ui/button';
import Table from '../../../common-ui/table';
import useMilestones from '../use-milestones';
import openedMilestoneIcon from '../../../assets/opened-milestone.svg';
import closedMilestoneIcon from '../../../assets/closed-issue.svg';
import trashIcon from '../../../assets/trash.svg';
import calendarIcon from '../../../assets/calendar.svg';
import openedMilestoneBlueIcon from '../../../assets/opened-milestone-blue.svg';

const MilestoneTable = () => {
  const { milestones } = useMilestones();
  const [isOpen, setIsOpen] = useState(true);
  const openMilestones = milestones?.filter(({ isOpen }) => isOpen);
  const closedMilestones = milestones?.filter(({ isOpen }) => !isOpen);
  let filteredMilestones = isOpen ? openMilestones : closedMilestones ?? [];

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
            <img src={openedMilestoneIcon} alt="열린 마일스톤" />
            열린 마일스톤 ({openMilestones?.length})
          </Button>
          <Button
            size="M"
            variant="ghosts"
            flexible
            onClick={() => setIsOpen(false)}
          >
            <img src={closedMilestoneIcon} alt="닫힌 마일스톤" />
            닫힌 마일스톤 ({closedMilestones?.length})
          </Button>
        </div>
      </Table.Header>

      <Table.Body
        data={filteredMilestones}
        render={({ title, id, description, dueDate }) => (
          <Table.Row key={id}>
            <div className="flex justify-between items-center min-h-[64px]">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-1">
                    <img src={openedMilestoneBlueIcon} alt="마일스톤" />
                    <span className="text-neutral-text-strong font-bold text-M">
                      {title}
                    </span>
                  </div>
                  {dueDate && (
                    <div className="flex gap-[2px] items-center">
                      <img
                        className="mt-[-2px]"
                        src={calendarIcon}
                        alt="완료 일정"
                      />
                      <span className="text-neutral-text-weak font-medium text-S">{`${dueDate.getFullYear()}. ${dueDate.getMonth()}. ${dueDate.getDate()}`}</span>
                    </div>
                  )}
                </div>
                <span className="text-neutral-text-weak font-normal text-M">
                  {description}
                </span>
              </div>

              <div className="flex gap-6 items-center">
                <Button size="M" variant="ghosts" flexible>
                  <img src={closedMilestoneIcon} alt="마일스톤 닫기" />
                  <span className="text-S font-bold">닫기</span>
                </Button>
                <Button size="M" variant="ghosts" flexible>
                  <img src={trashIcon} alt="마일스톤 삭제" />
                  <span className="text-danger-text text-S font-bold">
                    삭제
                  </span>
                </Button>
              </div>
            </div>
          </Table.Row>
        )}
      />
    </Table>
  );
};

export default MilestoneTable;
