import Signup from '@/pages/sign-up';
import UserService from '@/services/user/user-service';
import { LocationDisplay } from '@/tests/utils/location-display';
import { MockServicesProvider } from '@/tests/utils/mock-service-provider';
import { render } from '@/tests/utils/render-with-context';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('회원가입 페이지', () => {
  describe('폼 양식이 잘못된 경우', () => {
    afterEach(async () => {
      const signUpButton = await screen.findByRole('button', {
        name: '회원가입',
      });
      expect(signUpButton).toBeDisabled();
    });

    it('이메일 형식이 잘못된 경우, "이메일 형식이 올바르지 않습니다." 문구가 존재해야 한다. ', async () => {
      const user = userEvent.setup();
      render(
        <MockServicesProvider mockServices={{}}>
          <Signup />
        </MockServicesProvider>
      );

      const emailInput = await screen.findByLabelText('이메일');
      await user.clear(emailInput);
      await user.type(emailInput, 'email@naver');

      const errorMessage =
        await screen.findByText('이메일 형식이 올바르지 않습니다.');
      expect(errorMessage).toBeInTheDocument();
    });

    it('닉네임이 8글자 초과일 경우, "닉네임은 최대 8글자입니다." 문구가 존재해야 한다. ', async () => {
      const user = userEvent.setup();
      render(
        <MockServicesProvider mockServices={{}}>
          <Signup />
        </MockServicesProvider>
      );

      const nicknameInput = await screen.findByLabelText('닉네임');
      await user.clear(nicknameInput);
      await user.type(nicknameInput, '123456789');

      const errorMessage =
        await screen.findByText('닉네임은 최대 8글자입니다.');
      expect(errorMessage).toBeInTheDocument();
    });

    it('비밀번호가 6글자 미만일 경우, "비밀번호는 최소 6글자 이상이어야 합니다." 문구가 존재해야 한다.', async () => {
      const user = userEvent.setup();
      render(
        <MockServicesProvider mockServices={{}}>
          <Signup />
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
          <Signup />
        </MockServicesProvider>
      );

      const passwordInput = await screen.findByLabelText('비밀번호');
      await user.clear(passwordInput);
      await user.type(passwordInput, '1234561234567');

      const errorMessage =
        await screen.findByText('비밀번호는 최대 12글자입니다.');
      expect(errorMessage).toBeInTheDocument();
    });

    it('비밀번호와 비밀번호 확인 입력이 동일하지 않을 경우, "비밀번호가 일치하지 않습니다." 문구가 존재해야 한다.', async () => {
      const user = userEvent.setup();
      render(
        <MockServicesProvider mockServices={{}}>
          <Signup />
        </MockServicesProvider>
      );

      const passwordInput = await screen.findByLabelText('비밀번호');
      await user.clear(passwordInput);
      await user.type(passwordInput, '123456');

      const passwordCheckinput = await screen.findByLabelText('비밀번호 확인');
      await user.clear(passwordCheckinput);
      await user.type(passwordCheckinput, '1234567');

      const errorMessage =
        await screen.findByText('비밀번호가 일치하지 않습니다.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('폼 양식이 올바른 경우', () => {
    it('올바른 이메일, 닉네임, 패스워드, 패스워드 확인을 입력한 후 "회원가입" 버튼을 클릭하면, 이슈 목록 페이지로 이동해야 한다.', async () => {
      const user = userEvent.setup();
      const mockedUserService: Partial<UserService> = {
        signup: vi.fn().mockResolvedValue({
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
          <Signup />
          <LocationDisplay />
        </MockServicesProvider>
      );

      const emailInput = await screen.findByLabelText('이메일');
      await user.clear(emailInput);
      await user.type(emailInput, 'demo@example.com');

      const nicknameInput = await screen.findByLabelText('닉네임');
      await user.clear(nicknameInput);
      await user.type(nicknameInput, 'caesar');

      const passwordInput = await screen.findByLabelText('비밀번호');
      await user.clear(passwordInput);
      await user.type(passwordInput, '123456');

      const passwordCheckinput = await screen.findByLabelText('비밀번호 확인');
      await user.clear(passwordCheckinput);
      await user.type(passwordCheckinput, '123456');

      const signUpButton = await screen.findByRole('button', {
        name: '회원가입',
      });
      expect(signUpButton).toBeEnabled();

      await user.click(signUpButton);

      const locationElement = await screen.findByText('/issues');
      expect(locationElement).toBeInTheDocument();
    });

    it('이미 회원가입된 이메일을 입력후 "회원가입" 버튼을 클릭하면, "이미 사용중인 이메일입니다." 문구가 존재해야 한다.', async () => {
      const user = userEvent.setup();
      const mockedUserService: Partial<UserService> = {
        signup: vi.fn().mockRejectedValue({
          code: 'user_already_exists',
          message: 'User already registered',
        }),
      };

      render(
        <MockServicesProvider
          mockServices={{
            userService: mockedUserService as UserService,
          }}
        >
          <Signup />
        </MockServicesProvider>
      );

      const emailInput = await screen.findByLabelText('이메일');
      await user.clear(emailInput);
      await user.type(emailInput, 'demo@example.com');

      const nicknameInput = await screen.findByLabelText('닉네임');
      await user.clear(nicknameInput);
      await user.type(nicknameInput, 'caesar');

      const passwordInput = await screen.findByLabelText('비밀번호');
      await user.clear(passwordInput);
      await user.type(passwordInput, '123456');

      const passwordCheckinput = await screen.findByLabelText('비밀번호 확인');
      await user.clear(passwordCheckinput);
      await user.type(passwordCheckinput, '123456');

      const signUpButton = await screen.findByRole('button', {
        name: '회원가입',
      });
      expect(signUpButton).toBeEnabled();

      await user.click(signUpButton);

      const errorMessage =
        await screen.findByText('이미 사용중인 이메일입니다.');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
