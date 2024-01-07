import useLogin from '../use-login';
import Button from '../../../common-ui/button';
import Input from '../../../common-ui/input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type FormType = {
  email: string;
  password: string;
};

function LoginForm() {
  const { handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      email: 'wanseob.dev@gmail.com',
      password: 'dhkstjq123',
    },
  });
  const { login } = useLogin();

  const onSubmit: SubmitHandler<FormType> = ({ email, password }) => {
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input label="이메일" labelPosition="top" {...field} />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            label="비밀번호"
            labelPosition="top"
            type="password"
            {...field}
          />
        )}
      />

      <Button type="submit" size="L" variant="contained" className="w-80">
        로그인
      </Button>
    </form>
  );
}
export default LoginForm;
