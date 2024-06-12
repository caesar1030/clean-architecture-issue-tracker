import Table from '@/common-ui/table';
import LabelRow from '@/presentation/label/label-table/label-row';
import useLabels from '@/presentation/label/use-labels';
import { LabelsResponse } from '@/services/label/response';

const LabelTable = () => {
  const { labels } = useLabels();

  return (
    <Table columns="11rem 1fr auto" size="L">
      <Table.Header>
        <span className="text-neutral-text-weak text-M font-bold">
          {labels.length}개의 레이블
        </span>
      </Table.Header>

      <Table.Body<LabelsResponse['data'][number]>
        data={labels}
        render={(label) => <LabelRow key={label.id} label={label} />}
      />
    </Table>
  );
};

export default LabelTable;
