import Divider from '@/common-ui/divider';
import Heading from '@/common-ui/heading';
import CreateIssueForm from '@/presentation/issue/create-issue-form';

const NewIssue = () => {
  return (
    <>
      <Heading>새로운 이슈 작성</Heading>

      <Divider />

      <CreateIssueForm />
    </>
  );
};
export default NewIssue;
