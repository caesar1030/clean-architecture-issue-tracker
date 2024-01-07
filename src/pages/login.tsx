import Logo from '../common-ui/logo';
import LoginForm from '../presentation/auth/login-form';

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="mb-16">
        <Logo size="large" />
      </div>
      <LoginForm />
    </div>
  );
}
export default Login;
