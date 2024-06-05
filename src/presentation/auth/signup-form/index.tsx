import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/common-ui/button';
import Input from '@/common-ui/input';
import useSignup from '@/presentation/auth/use-signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schemas/user/signup-schema';

type FormType = {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
};

const SignupForm = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });
  const { signup } = useSignup();

  const onSubmit: SubmitHandler<FormType> = ({ email, password, nickname }) => {
    signup(
      {
        email,
        password,
        nickname,
      },
      {
        onError: () => {
          setError('email', {
            message: '이미 사용중인 이메일입니다.',
          });
        },
      }
    );
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
            error={errors.email?.message}
            labelPosition="top"
            {...field}
          />
        )}
      />
      <Controller
        name="nickname"
        control={control}
        render={({ field }) => (
          <Input
            id="nickname"
            type="text"
            label="닉네임"
            error={errors.nickname?.message}
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
            error={errors.password?.message}
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
            error={errors.passwordCheck?.message}
            type="password"
            {...field}
          />
        )}
      />

      <Button
        type="submit"
        size="L"
        variant="contained"
        className="w-80"
        disabled={!isValid}
      >
        회원가입
      </Button>
    </form>
  );
};
export default SignupForm;
