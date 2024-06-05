import { z } from 'zod';

export const MilestoneSchema = z.object({
  title: z
    .string()
    .min(1, '마일스톤 제목을 입력해주세요.')
    .max(8, '마일스톤 제목은 최대 8글자입니다.'),
  description: z
    .string()
    .max(100, '마일스톤 설명은 최대 100 글자입니다.')
    .optional(),
  date: z
    .union([
      z
        .string()
        .regex(
          /^[0-9]{4}\.[0-9]{2}\.[0-9]{2}$/,
          '날짜는 YYYY.MM.DD 형식이어야 합니다.'
        ),
      z.literal(''), // 빈 문자열을 허용
    ])
    .optional(),
});
