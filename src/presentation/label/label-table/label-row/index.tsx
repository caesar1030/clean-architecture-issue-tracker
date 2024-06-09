import { useState } from 'react';
import editIcon from '@/assets/edit.svg';
import trashIcon from '@/assets/trash.svg';
import { LabelsResponse } from '@/services/label';
import useDeleteLabel from '@/presentation/label/use-delete-label';
import EditLabelForm from '@/presentation/label/label-table/label-row/edit-label-form';
import Table from '@/common-ui/table';
import LabelTag from '@/common-ui/label-tag';
import Button from '@/common-ui/button';

export interface LabelRowProps {
  label: LabelsResponse['data'][number];
}

const LabelRow = ({ label }: LabelRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteLabel, isDeleting } = useDeleteLabel();
  const closeEditingSession = () => setIsEditing(false);

  if (isEditing)
    return (
      <EditLabelForm closeEditingSession={closeEditingSession} label={label} />
    );

  return (
    <Table.Row className="py-8">
      <LabelTag
        textColor={label.textColor}
        backgroundColor={label.backgroundColor}
      >
        {label.title}
      </LabelTag>
      <span className="text-neutral-text-weak">{label.description}</span>
      <div className="flex gap-6">
        <Button
          size="S"
          variant="ghosts"
          flexible
          onClick={() => setIsEditing(true)}
        >
          <img width={16} height={16} src={editIcon} alt="라벨 편집" />
          <span className="text-neutral-text font-bold text-S">편집</span>
        </Button>
        <Button
          size="S"
          variant="ghosts"
          flexible
          onClick={() => deleteLabel({ id: label.id })}
          disabled={isDeleting}
        >
          <img width={16} height={16} src={trashIcon} alt="라벨 삭제" />
          <span className="text-danger-text font-bold text-S">삭제</span>
        </Button>
      </div>
    </Table.Row>
  );
};

export default LabelRow;
