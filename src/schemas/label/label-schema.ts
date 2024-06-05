import { z } from 'zod';

export const LabelSchema = z.object({
  title: z
    .string()
    .min(1, '레이블 제목을 입력해주세요.')
    .max(8, '레이블 제목은 최대 8글자입니다.'),
  description: z
    .string()
    .max(100, '레이블 설명은 최대 100 글자입니다.')
    .optional(),
  backgroundColor: z
    .string()
    .regex(
      /^#[0-9A-F]{3}([0-9A-F]{3})?$/i,
      '배경색은 유효한 컬러코드여야 합니다.'
    ),
});
