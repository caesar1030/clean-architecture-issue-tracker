import { useParams } from 'react-router-dom';
import useIssue from '../use-issue';
import IssueTitle from './issue-title';
import { Issue } from '../../../domain/model/issue';
import Button from '../../../common-ui/button';
import InformationTag from '../../../common-ui/information-tag';
import { timeDiffFromNow } from '../../../utils/helpers';
import Table from '../../../common-ui/table';
import TextArea from '../../../common-ui/text-area';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface CommentType {
  comment: string;
}

function IssueDetail() {
  const { id } = useParams();
  const { issue } = useIssue(Number(id) as Issue['id']);
  const { control, handleSubmit } = useForm<CommentType>({
    defaultValues: {
      comment: '',
    },
  });

  // TODO: comment 테이블 생성 후 수정
  const onSubmit: SubmitHandler<CommentType> = ({ comment }) => {};

  return (
    <>
      <div className="flex">
        <div className="grow">
          <IssueTitle issue={issue} />
        </div>
        <div className="flex gap-2">
          <Button size="S" variant="outline">
            제목 편집
          </Button>
          <Button size="S" variant="outline">
            이슈 닫기
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-neutral-text-weak">
        <InformationTag variant="open">열린 이슈</InformationTag>
        {issue?.createdAt && (
          <span>{`이 이슈가 ${timeDiffFromNow(issue?.createdAt)}전에 ${
            issue.isOpen ? '열렸습니다' : '닫혔습니다'
          }`}</span>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <Table columns="1fr" size="L">
          <Table.Header>dd</Table.Header>
          <Table.Row>{issue?.contents || '없음'}</Table.Row>
        </Table>

        {issue?.comments &&
          issue?.comments.map((comment) => {
            return (
              <Table columns="1fr" size="L">
                <Table.Header>ㅇㅇ</Table.Header>
                <Table.Row>{comment.contents}</Table.Row>
              </Table>
            );
          })}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Controller
            name="comment"
            control={control}
            render={({ field }) => {
              return (
                <TextArea
                  label="코멘트를 입력하세요."
                  className="h-60"
                  {...field}
                />
              );
            }}
          />

          <Button size="S" variant="contained" className="self-end ">
            코멘트 작성
          </Button>
        </form>
      </div>
    </>
  );
}
export default IssueDetail;
