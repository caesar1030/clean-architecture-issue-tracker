import { z } from 'zod';

export const signupSchema = z
  .object({
    nickname: z
      .string()
      .min(1, '닉네임은 최소 1글자 이상이어야 합니다.')
      .max(8, '닉네임은 최대 8글자입니다.'),
    passwordCheck: z.string(),
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('이메일 형식이 올바르지 않습니다.'),
    password: z
      .string()
      .min(6, '비밀번호는 최소 6글자 이상이어야 합니다.')
      .max(12, '비밀번호는 최대 12글자입니다.'),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });
