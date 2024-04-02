import { useState } from 'react';
import Navbar from '../common-ui/navbar';
import LabelTable from '../presentation/label/label-table';
import Button from '../common-ui/button';
import CreateLabelForm from '../presentation/label/new-label-form.tsx';

function Labels() {
  const [isAddSession, setIsAddSession] = useState(false);

  return (
    <>
      <div className="flex justify-between">
        <Navbar />
        {!isAddSession ? (
          <Button
            size="S"
            variant="contained"
            onClick={() => setIsAddSession(true)}
          >
            레이블 추가
          </Button>
        ) : (
          <Button
            size="S"
            variant="outline"
            onClick={() => setIsAddSession(false)}
          >
            닫기
          </Button>
        )}
      </div>

      {isAddSession && (
        <CreateLabelForm closeAddSession={() => setIsAddSession(false)} />
      )}
      <LabelTable />
    </>
  );
}
export default Labels;
