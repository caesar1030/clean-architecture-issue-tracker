import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import grip from '@/assets/grip.svg';
import Table from '@/common-ui/table';
import Avatar from '@/common-ui/avatar';
import { getTimeDiff } from '@/utils/helpers';
import InformationTag from '@/common-ui/information-tag';
import { IssueResponse } from '@/model/issue/response';

export interface EditIssueContentsFormProps
  extends ComponentPropsWithRef<'textarea'> {
  comment: NonNullable<IssueResponse['data']['comments']>[number];
  issueAuthor: IssueResponse['data']['author'];
}

const EditCommentContentsForm = forwardRef(
  (
    { comment, issueAuthor, ...rest }: EditIssueContentsFormProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <>
        <div className="border rounded-large border-neutral-border-active">
          <Table columns="1fr" size="L">
            <Table.Header>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <Avatar src={comment.author.avatar} />
                  <span className="text-M text-neutral-text-strong">
                    {comment.author.nickname}
                  </span>
                  <span className="text-M text-neutral-text-weak">
                    {getTimeDiff(comment.createdAt)} 전
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  {comment.author.id === issueAuthor.id && (
                    <InformationTag variant="writer">작성자</InformationTag>
                  )}
                </div>
              </div>
            </Table.Header>
            <Table.Row>
              <textarea
                {...rest}
                ref={ref}
                value={rest.value}
                className="w-full bg-inherit focus:outline-none text-neutral-text-strong text-M grow resize-none"
              />

              <div className="flex gap-2 justify-end">
                <span className="text-neutral-text-weak text-S">{`띄어쓰기 포함 ${
                  (rest.value as string)?.length
                }자`}</span>

                <img
                  width={20}
                  height={20}
                  src={grip}
                  alt="그립"
                  className="w-5 h-5"
                />
              </div>
            </Table.Row>
          </Table>
        </div>
      </>
    );
  }
);

export default EditCommentContentsForm;
