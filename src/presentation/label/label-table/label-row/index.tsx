import { useState } from 'react';
import Button from '../../../../common-ui/button';
import LabelTag from '../../../../common-ui/label-tag';
import Table from '../../../../common-ui/table';
import { LabelsResponse } from '../../../../domain/model/label/response';
import EditLabelForm from './edit-label-form';
import editIcon from '../../../../assets/edit.svg';
import trashIcon from '../../../../assets/trash.svg';

export interface LabelRowProps {
  label: LabelsResponse['data'][number];
}

const LabelRow = ({ label }: LabelRowProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) return <EditLabelForm label={label} />;

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
          <img src={editIcon} alt="라벨 편집" />
          <span className="text-neutral-text font-bold text-S">편집</span>
        </Button>
        <Button size="S" variant="ghosts" flexible>
          <img src={trashIcon} alt="라벨 삭제" />
          <span className="text-danger-text font-bold text-S">삭제</span>
        </Button>
      </div>
    </Table.Row>
  );
};
export default LabelRow;
