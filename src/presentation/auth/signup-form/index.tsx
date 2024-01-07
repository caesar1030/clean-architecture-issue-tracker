import Button from '../../../common-ui/button';
import Input from '../../../common-ui/input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useSignup from '../use-signup';

type FormType = {
  email: string;
  password: string;
  passwordCheck: string;
};

function SignupForm() {
  const { handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
      passwordCheck: '',
    },
  });
  const { signup } = useSignup();

  const onSubmit: SubmitHandler<FormType> = ({ email, password }) => {
    signup({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            id="email"
            type="email"
            label="이메일"
            labelPosition="top"
            {...field}
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
            {...field}
          />
        )}
      />
      <Controller
        name="passwordCheck"
        control={control}
        render={({ field }) => (
          <Input
            id="password check"
            label="비밀번호 확인"
            labelPosition="top"
            type="password"
            {...field}
          />
        )}
      />

      <Button type="submit" size="L" variant="contained" className="w-80">
        회원가입
      </Button>
    </form>
  );
}
export default SignupForm;
