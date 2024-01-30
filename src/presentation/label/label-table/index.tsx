import Table from '../../../common-ui/table';
import { LabelsResponse } from '../../../domain/model/label/response';
import useLabels from '../use-labels';
import LabelRow from './label-row';

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
        render={(label) => <LabelRow label={label} />}
      />
    </Table>
  );
};
export default LabelTable;
