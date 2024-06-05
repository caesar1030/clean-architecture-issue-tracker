import { z } from 'zod';

export const CommentSchema = z.object({
  contents: z
    .string()
    .min(1, '코멘트를 입력해주세요.')
    .max(500, '내용은 최대 500글자입니다.'),
});
