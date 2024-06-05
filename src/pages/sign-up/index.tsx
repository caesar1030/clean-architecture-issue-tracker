import Logo from '@/common-ui/other';
import SignupForm from '@/presentation/auth/signup-form';

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="mb-16">
        <Logo size="large" />
      </div>
      <SignupForm />
    </div>
  );
};
export default Signup;
