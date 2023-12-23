type CommentId = Brand<number, 'CommentId'>;
type CommentContents = Brand<string, 'CommentContents'>;
type CommentCreatedAt = Brand<Date, 'CommentCreatedAt'>;

export interface Comment {
  id: CommentId;
  contents: CommentContents;
  createdAt: CommentCreatedAt;
}
