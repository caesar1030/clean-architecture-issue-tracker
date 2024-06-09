import { useState } from 'react';
import CreateMilestoneForm from '@/presentation/milestone/create-milestone-form';
import Navbar from '@/router/navbar';
import Button from '@/common-ui/button';
import MilestoneTable from '@/presentation/milestone/milestone-table';
import plusIcon from '@/assets/plus-white.svg';
import xIcon from '@/assets/x-blue.svg';

const Milestones = () => {
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
            <img width={16} height={16} src={plusIcon} alt="마일스톤 추가" />
            마일스톤 추가
          </Button>
        ) : (
          <Button
            size="S"
            variant="outline"
            onClick={() => setIsAddSession(false)}
          >
            <img width={16} height={16} src={xIcon} alt="닫기" />
            닫기
          </Button>
        )}
      </div>

      {isAddSession && (
        <CreateMilestoneForm stopEditSession={() => setIsAddSession(false)} />
      )}

      <MilestoneTable />
    </>
  );
};
export default Milestones;
