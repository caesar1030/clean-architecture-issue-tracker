export const TYPES = {
  IssueDataSource: Symbol.for('IssueDataSource'),
  IssueRepository: Symbol.for('IssueRepository'),
  GetIssueUseCase: Symbol.for('GetIssueUseCase'),
  GetIssuesUseCase: Symbol.for('GetIssuesUseCase'),
  OpenIssuesUseCase: Symbol.for('OpenIssuesUseCase'),
  CloseIssuesUseCase: Symbol.for('CloseIssuesUseCase'),
  CreateIssueUseCase: Symbol.for('CreateIssueUseCase'),
  EditIssueUseCase: Symbol.for('EditIssueUseCase'),
  DeleteIssueUseCase: Symbol.for('DeleteIssueUseCase'),

  CommentDataSource: Symbol.for('CommentDataSource'),
  CommentRepository: Symbol.for('CommentRepository'),
  CreateCommentUseCase: Symbol.for('CreateCommentUseCase'),
  EditCommentUseCase: Symbol.for('EditCommentUseCase'),

  LabelDataSource: Symbol.for('LabelDataSource'),
  LabelRepository: Symbol.for('LabelRepository'),
  GetLabelsUseCase: Symbol.for('GetLabelsUseCase'),
  EditlabelUseCase: Symbol.for('EditLabelUseCase'),

  MilestoneDataSource: Symbol.for('MilestoneDataSource'),
  MilestoneRepository: Symbol.for('MilestoneRepository'),
  GetMilestonesUseCase: Symbol.for('GetMilestonesUseCase'),

  AuthDataSource: Symbol.for('AuthDataSource'),
  AuthRepository: Symbol.for('AuthRepository'),
  SignupUseCase: Symbol.for('SignupUseCase'),
  LoginUseCase: Symbol.for('LoginUseCase'),
  LogOutUseCase: Symbol.for('LogoutUseCase'),
  GetUserUseCase: Symbol.for('GetUserUseCase'),
  GetUsersUseCase: Symbol.for('GetUsersUseCase'),
};
