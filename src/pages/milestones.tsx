import { useState } from 'react';
import CreateMilestoneForm from '../presentation/milestone/create-milestone-form';
import Navbar from '../common-ui/navbar';
import Button from '../common-ui/button';
import MilestoneTable from '../presentation/milestone/milestone-table';
import plusIcon from '../assets/plus-white.svg';

function Milestones() {
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
            <img src={plusIcon} alt="마일스톤 추가" />
            마일스톤 추가
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

      {isAddSession && <CreateMilestoneForm />}

      <MilestoneTable />
    </>
  );
}
export default Milestones;
