import { z } from 'zod';

export const IssueSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(30, '제목은 최대 30글자입니다.'),
  contents: z.union([
    z.string().max(500, '내용은 최대 500글자입니다.').optional(),
    z.literal(''),
  ]),
  label: z.any().optional(),
  milestone: z.any().optional(),
  assignee: z.any().optional(),
});
