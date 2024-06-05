import { useState } from 'react';
import Navbar from '@/common-ui/navbar';
import LabelTable from '@/presentation/label/label-table';
import Button from '@/common-ui/button';
import CreateLabelForm from '@/presentation/label/create-label-form.tsx/index.tsx';
import plusIcon from '@/assets/plus-white.svg';
import xIcon from '@/assets/x-blue.svg';

const Labels = () => {
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
            <img width={16} height={16} src={plusIcon} alt="레이블 추가" />
            레이블 추가
          </Button>
        ) : (
          <Button
            size="S"
            variant="outline"
            onClick={() => setIsAddSession(false)}
          >
            <img width={16} height={16} src={xIcon} alt="레이블 추가 취소" />
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
};
export default Labels;
