import { loginSchema } from '@/schemas/user/login-schema';
import { z } from 'zod';

export const signupSchema = loginSchema
  .extend({
    nickname: z
      .string()
      .min(1, '닉네임은 최소 1글자 이상이어야 합니다.')
      .max(8, '닉네임은 최대 8글자입니다.'),
    passwordCheck: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });
