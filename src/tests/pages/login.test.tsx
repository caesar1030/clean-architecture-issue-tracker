import Login from '@/pages/login';
import UserService from '@/services/user/user-service';
import { LocationDisplay } from '@/tests/test-utils/location-display';
import { MockServicesProvider } from '@/tests/test-utils/mock-service-provider';
import { render } from '@/tests/test-utils/render-with-context';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('로그인 페이지', () => {
  describe('폼 양식이 잘못된 경우', () => {
    afterEach(async () => {
      const loginButton = await screen.findByRole('button', { name: '로그인' });
      expect(loginButton).toBeDisabled();
    });

    it('이메일 형식이 잘못된 경우, "이메일 형식이 올바르지 않습니다." 문구가 존재해야 한다.', async () => {
      const user = userEvent.setup();
      render(
        <MockServicesProvider mockServices={{}}>
          <Login />
        </MockServicesProvider>
      );

      const emailInput = await screen.findByLabelText('이메일');
      await user.clear(emailInput);
      await user.type(emailInput, 'email@naver');

      const errorMessage =
        await screen.findByText('이메일 형식이 올바르지 않습니다.');
      expect(errorMessage).toBeInTheDocument();
    });

    it('비밀번호가 6글자 미만일 경우, "비밀번호는 최소 6글자 이상이어야 합니다." 문구가 존재해야 한다.', async () => {
      const user = userEvent.setup();
      render(
        <MockServicesProvider mockServices={{}}>
          <Login />
        </MockServicesProvider>
      );

      const passwordInput = await screen.findByLabelText('비밀번호');
      await user.clear(passwordInput);
      await user.type(passwordInput, '123');

      const errorMessage = await screen.findByText(
        '비밀번호는 최소 6글자 이상이어야 합니다.'
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it('비밀번호가 12글자 초과일 경우, "비밀번호는 최대 12글자입니다." 문구가 존재해야 한다.', async () => {
      const user = userEvent.setup();
      render(
        <MockServicesProvider mockServices={{}}>
          <Login />
        </MockServicesProvider>
      );

      const passwordInput = await screen.findByLabelText('비밀번호');
      await user.clear(passwordInput);
      await user.type(passwordInput, '1234561234567');

      const errorMessage =
        await screen.findByText('비밀번호는 최대 12글자입니다.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('폼 양식이 올바른 경우', () => {
    it('올바른 이메일과 패스워드를 입력한 후 "로그인" 버튼을 클릭하면, 이슈 목록 페이지로 이동해야 한다.', async () => {
      const user = userEvent.setup();
      const mockedUserService: Partial<UserService> = {
        login: vi.fn().mockResolvedValue({
          data: {
            id: '123',
            role: 'authenticated',
            avatar: '',
            nickname: 'caesar',
          },
        }),
      };

      render(
        <MockServicesProvider
          mockServices={{
            userService: mockedUserService as UserService,
          }}
        >
          <Login />
          <LocationDisplay />
        </MockServicesProvider>
      );

      const emailInput = await screen.findByLabelText('이메일');
      await user.clear(emailInput);
      await user.type(emailInput, 'demo@example.com');

      const passwordInput = await screen.findByLabelText('비밀번호');
      await user.clear(passwordInput);
      await user.type(passwordInput, '123456');

      const loginButton = await screen.findByRole('button', { name: '로그인' });
      expect(loginButton).toBeEnabled();

      await user.click(loginButton);

      const locationElement = await screen.findByText('/issues');
      expect(locationElement).toBeInTheDocument();
    });

    it('잘못된 이메일과 패스워드를 입력한 후 "로그인" 버튼을 클릭하면, "잘못된 이메일 또는 비밀번호 입니다." 문구가 존재해야 한다.', async () => {
      const user = userEvent.setup();
      const mockedUserService: Partial<UserService> = {
        login: vi.fn().mockRejectedValue({
          error: 'invalid_grant',
          error_description: 'Invalid login credentials',
        }),
      };

      render(
        <MockServicesProvider
          mockServices={{
            userService: mockedUserService as UserService,
          }}
        >
          <Login />
        </MockServicesProvider>
      );

      const emailInput = await screen.findByLabelText('이메일');
      await user.clear(emailInput);
      await user.type(emailInput, 'demo@example.com');

      const passwordInput = await screen.findByLabelText('비밀번호');
      await user.clear(passwordInput);
      await user.type(passwordInput, '1234567');

      const loginButton = await screen.findByRole('button', { name: '로그인' });
      expect(loginButton).toBeEnabled();

      await user.click(loginButton);

      const errorMessage = await screen.findByText(
        '잘못된 이메일 또는 비밀번호 입니다.'
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
