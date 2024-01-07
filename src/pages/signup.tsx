import Logo from '../common-ui/logo';
import SignupForm from '../presentation/auth/signup-form';

function Signup() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="mb-16">
        <Logo size="large" />
      </div>
      <SignupForm />
    </div>
  );
}
export default Signup;
