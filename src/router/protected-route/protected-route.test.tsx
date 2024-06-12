import { vi } from 'vitest';
import { render } from '@/tests/utils/render-with-context';
import ProtectedRoute from '@/router/protected-route';
import UserService from '@/services/user/user-service';
import { screen } from '@testing-library/react';
import { LocationDisplay } from '@/tests/utils/location-display';
import { MockServicesProvider } from '@/tests/utils/mock-service-provider';

describe('ProtectedRoute 컴포넌트', () => {
  const TestComponent = () => <div>Test Component</div>;

  it('로그인이 되어 있지 않은 경우, 로그인 페이지로 이동해야 한다.', async () => {
    const mockedUserService: Partial<UserService> = {
      getUser: vi.fn().mockRejectedValue({}),
    };

    render(
      <MockServicesProvider
        mockServices={{
          userService: mockedUserService,
        }}
      >
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>

        <LocationDisplay />
      </MockServicesProvider>
    );

    const locationElement = await screen.findByText('/login');
    expect(locationElement).toBeInTheDocument();
  });

  it('로그인이 되어 있는 경우, 자식 컴포넌트를 렌더링해야 한다.', async () => {
    const mockedUserService: Partial<UserService> = {
      getUser: vi.fn().mockResolvedValue({
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
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </MockServicesProvider>
    );

    const childElement = await screen.findByText('Test Component');
    expect(childElement).toBeInTheDocument();
  });
});
