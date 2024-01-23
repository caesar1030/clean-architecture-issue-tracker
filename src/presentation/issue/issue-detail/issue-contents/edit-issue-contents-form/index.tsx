import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import Avatar from '../../../../../common-ui/avatar';
import Button from '../../../../../common-ui/button';
import InformationTag from '../../../../../common-ui/information-tag';
import Table from '../../../../../common-ui/table';
import { IssueResponse } from '../../../../../domain/model/issue/response';
import { timeDiffFromNow } from '../../../../../utils/helpers';

export interface EditIssueContentsFormProps
  extends ComponentPropsWithRef<'textarea'> {
  issue: IssueResponse['data'] | undefined;
}

const EditIssueContentsForm = forwardRef(
  (
    { issue, ...rest }: EditIssueContentsFormProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <>
        <div className="border rounded-large border-neutral-border-active">
          <Table columns="1fr" size="L">
            <Table.Header>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <Avatar src={issue?.author.avatar} />
                  <span className="text-M text-neutral-text-strong">
                    {issue?.author.nickname}
                  </span>
                  <span className="text-M text-neutral-text-weak">
                    {issue && timeDiffFromNow(issue.createdAt)} 전
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <InformationTag variant="writer">작성자</InformationTag>
                  <Button size="S" variant="ghosts" flexible>
                    편집
                  </Button>
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

                <img src="/public/grip.svg" alt="그립" className="w-5 h-5" />
              </div>
            </Table.Row>
          </Table>
        </div>
      </>
    );
  }
);

export default EditIssueContentsForm;
