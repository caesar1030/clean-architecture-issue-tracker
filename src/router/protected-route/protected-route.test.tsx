import { vi } from 'vitest';
import { render } from '@/tests/utils/render-with-context';
import ProtectedRoute from '@/router/protected-route';
import { ServicesProvider } from '@/services/service-provider';
import UserService from '@/services/user/user-service';
import { ServiceRegistry } from '@/services/services';
import { screen } from '@testing-library/react';
import { LocationDisplay } from '@/tests/utils/location-display';

describe('ProtectedRoute 컴포넌트', () => {
  const TestComponent = () => <div>Test Component</div>;

  it('로그인이 되어 있지 않은 경우, 로그인 페이지로 이동해야 한다.', async () => {
    const mockedUserService: Partial<UserService> = {
      getUser: vi.fn().mockRejectedValue({}),
    };

    render(
      <ServicesProvider
        serviceRegistry={
          {
            userService: mockedUserService,
          } as ServiceRegistry
        }
      >
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>

        <LocationDisplay />
      </ServicesProvider>
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
      <ServicesProvider
        serviceRegistry={
          {
            userService: mockedUserService,
          } as ServiceRegistry
        }
      >
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </ServicesProvider>
    );

    const childElement = await screen.findByText('Test Component');
    expect(childElement).toBeInTheDocument();
  });
});
