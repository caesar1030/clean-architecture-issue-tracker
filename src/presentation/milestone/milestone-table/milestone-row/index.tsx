import trashIcon from '@/assets/trash.svg';
import calendarIcon from '@/assets/calendar.svg';
import openedMilestoneBlueIcon from '@/assets/opened-milestone-blue.svg';
import editIcon from '@/assets/edit.svg';
import closedMilestoneIcon from '@/assets/closed-issue.svg';
import { useState } from 'react';
import { MilestonesResopnse } from '@/model/milestone/response';
import useDeleteMilestone from '@/presentation/milestone/use-delete-milestone';
import useEditMilestone from '@/presentation/milestone/use-edit-milestone';
import EditMilestoneForm from '@/presentation/milestone/milestone-table/milestone-row/edit-milestone-form';
import Table from '@/common-ui/table';
import Button from '@/common-ui/button';

interface MilestoneRowProps {
  milestone: MilestonesResopnse['data'][number];
}

const MilestoneRow = ({ milestone }: MilestoneRowProps) => {
  const [isEditSession, setIsEditSession] = useState(false);

  const { deleteMilestone, isDeleting } = useDeleteMilestone();
  const { editMilestone, isEditing } = useEditMilestone();
  const { id, description, dueDate, isOpen, title } = milestone;

  if (isEditSession)
    return (
      <EditMilestoneForm
        milestone={milestone}
        closeEditSession={() => setIsEditSession(false)}
      />
    );

  return (
    <Table.Row key={id}>
      <div className="flex justify-between items-center min-h-[64px]">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <div className="flex gap-1">
              <img
                width={16}
                height={16}
                src={openedMilestoneBlueIcon}
                alt="마일스톤"
              />
              <span className="text-neutral-text-strong font-bold text-M">
                {title}
              </span>
            </div>
            {dueDate && (
              <div className="flex gap-[2px] items-center">
                <img
                  width={16}
                  height={16}
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
          <Button
            size="M"
            variant="ghosts"
            flexible
            onClick={() =>
              editMilestone({
                id,
                isOpen: !isOpen,
              })
            }
            disabled={isEditing}
          >
            <img
              width={16}
              height={16}
              src={closedMilestoneIcon}
              alt="마일스톤 닫기"
            />
            <span className="text-S font-bold">{isOpen ? '닫기' : '열기'}</span>
          </Button>
          <Button
            size="M"
            variant="ghosts"
            flexible
            onClick={() => setIsEditSession(true)}
            disabled={isEditing}
          >
            <img width={16} height={16} src={editIcon} alt="마일스톤 편집" />
            <span className="text-S font-bold">편집</span>
          </Button>
          <Button
            size="M"
            variant="ghosts"
            flexible
            onClick={() => deleteMilestone({ id })}
            disabled={isDeleting}
          >
            <img width={16} height={16} src={trashIcon} alt="마일스톤 삭제" />
            <span className="text-danger-text text-S font-bold">삭제</span>
          </Button>
        </div>
      </div>
    </Table.Row>
  );
};

export default MilestoneRow;
