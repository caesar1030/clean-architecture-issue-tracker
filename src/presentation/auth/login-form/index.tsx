import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import plusIcon from '@/assets/plus.svg';
import Input from '@/common-ui/input';
import Button from '@/common-ui/button';
import useLogin from '@/presentation/auth/use-login';

type FormType = {
  email: string;
  password: string;
};

const LoginForm = () => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 items-center"
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            id="email"
            label="이메일"
            labelPosition="top"
            {...field}
            className="w-80"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            id="password"
            label="비밀번호"
            labelPosition="top"
            type="password"
            className="w-80"
            {...field}
          />
        )}
      />

      <Button type="submit" size="L" variant="contained" className="w-80">
        로그인
      </Button>

      <Button to={'/new-user'} type="button" size="S" variant="ghosts">
        <img width={16} height={16} src={plusIcon} alt="회원가입" />
        <span>회원가입</span>
      </Button>
    </form>
  );
};

export default LoginForm;
