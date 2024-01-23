import { Container } from 'inversify';
import IssueDataSourceImpl from '../data/data-source/api/issue-data-source-impl';
import IssueDataSource from '../data/data-source/issue-data-source';
import { IssueRepository } from '../domain/repository/issue-repository';
import { IssueRepositoryImpl } from '../data/repository/issue-repository-impl';
import {
  GetIssues,
  GetIssuesUseCase,
} from '../domain/use-case/issues/get-issues';
import {
  CloseIssues,
  CloseIssuesUseCase,
} from '../domain/use-case/issues/close-issues';
import {
  OpenIssues,
  OpenIssuesUseCase,
} from '../domain/use-case/issues/open-issues';
import { TYPES } from './types';
import LabelDataSource from '../data/data-source/label-data-source';
import LabelDataSourceImpl from '../data/data-source/api/label-data-source-impl';
import { LabelRepository } from '../domain/repository/label-repository';
import { LabelRepositoryImpl } from '../data/repository/label-repository-impl';
import {
  GetLabels,
  GetLabelsUseCase,
} from '../domain/use-case/labels/get-labels';
import {
  GetMilestones,
  GetMilestonesUseCase,
} from '../domain/use-case/milestones/get-milestones';
import { MilestoneRepository } from '../domain/repository/milestone-repository';
import MilestoneDataSourceImpl from '../data/data-source/api/milestone-data-source-impl';
import MilestoneDataSource from '../data/data-source/milestone-data-source';
import { MilestoneRepositoryImpl } from '../data/repository/milestone-repository-impl';
import {
  CreateIssue,
  CreateIssueUseCase,
} from '../domain/use-case/issues/create-issue';
import { GetIssue, GetIssueUseCase } from '../domain/use-case/issues/get-issue';
import CommentDataSource from '../data/data-source/comment-data-source';
import CommentDataSourceImple from '../data/data-source/api/comment-data-source-impl';
import { CommentRepository } from '../domain/repository/comment-repository';
import { CommentRepositoryImpl } from '../data/repository/comment-repository-impl';
import {
  CreateComment,
  CreateCommentUseCase,
} from '../domain/use-case/comments/create-comment';
import AuthDataSource from '../data/data-source/auth-data-source';
import AuthDataSourceImpl from '../data/data-source/api/auth-data-source';
import { AuthRepository } from '../domain/repository/auth-repository';
import { AuthRepositoryImpl } from '../data/repository/auth-repository';
import { Login, LoginUseCase } from '../domain/use-case/auth/login';
import { GetUser, GetUserUseCase } from '../domain/use-case/auth/get-user';
import { Logout, LogoutUseCase } from '../domain/use-case/auth/logout';
import { Signup, SignupUseCase } from '../domain/use-case/auth/signup';
import { GetUsers, GetUsersUseCase } from '../domain/use-case/auth/get-users';
import {
  EditIssue,
  EditIssueUseCase,
} from '../domain/use-case/issues/edit-issue';
import {
  DeleteIssue,
  DeleteIssueUseCase,
} from '../domain/use-case/issues/delete-issue';
import {
  EditComment,
  EditCommentUseCase,
} from '../domain/use-case/comments/edit-comment';

const container = new Container();

container.bind<IssueDataSource>(TYPES.IssueDataSource).to(IssueDataSourceImpl);
container.bind<IssueRepository>(TYPES.IssueRepository).to(IssueRepositoryImpl);
container.bind<GetIssueUseCase>(TYPES.GetIssueUseCase).to(GetIssue);
container.bind<GetIssuesUseCase>(TYPES.GetIssuesUseCase).to(GetIssues);
container.bind<CloseIssuesUseCase>(TYPES.CloseIssuesUseCase).to(CloseIssues);
container.bind<OpenIssuesUseCase>(TYPES.OpenIssuesUseCase).to(OpenIssues);
container.bind<CreateIssueUseCase>(TYPES.CreateIssueUseCase).to(CreateIssue);
container.bind<DeleteIssueUseCase>(TYPES.DeleteIssueUseCase).to(DeleteIssue);
container.bind<EditIssueUseCase>(TYPES.EditIssueUseCase).to(EditIssue);

container
  .bind<CommentDataSource>(TYPES.CommentDataSource)
  .to(CommentDataSourceImple);
container
  .bind<CommentRepository>(TYPES.CommentRepository)
  .to(CommentRepositoryImpl);
container
  .bind<CreateCommentUseCase>(TYPES.CreateCommentUseCase)
  .to(CreateComment);
container.bind<EditCommentUseCase>(TYPES.EditCommentUseCase).to(EditComment);

container.bind<LabelDataSource>(TYPES.LabelDataSource).to(LabelDataSourceImpl);
container.bind<LabelRepository>(TYPES.LabelRepository).to(LabelRepositoryImpl);
container.bind<GetLabelsUseCase>(TYPES.GetLabelsUseCase).to(GetLabels);

container
  .bind<MilestoneDataSource>(TYPES.MilestoneDataSource)
  .to(MilestoneDataSourceImpl);
container
  .bind<MilestoneRepository>(TYPES.MilestoneRepository)
  .to(MilestoneRepositoryImpl);
container
  .bind<GetMilestonesUseCase>(TYPES.GetMilestonesUseCase)
  .to(GetMilestones);

container.bind<AuthDataSource>(TYPES.AuthDataSource).to(AuthDataSourceImpl);
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepositoryImpl);
container.bind<SignupUseCase>(TYPES.SignupUseCase).to(Signup);
container.bind<LoginUseCase>(TYPES.LoginUseCase).to(Login);
container.bind<LogoutUseCase>(TYPES.LogOutUseCase).to(Logout);
container.bind<GetUserUseCase>(TYPES.GetUserUseCase).to(GetUser);
container.bind<GetUsersUseCase>(TYPES.GetUsersUseCase).to(GetUsers);

export { container };
