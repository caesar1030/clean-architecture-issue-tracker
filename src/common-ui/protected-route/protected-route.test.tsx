import ProtectedRoute from './';
import { vi } from 'vitest';
import { render } from '../../tests/utils/render-with-context';
import { useNavigate } from 'react-router-dom';
import useUser from '../../presentation/auth/use-user';
import { screen } from '@testing-library/react';

vi.mock('../../presentation/auth/use-user', () => ({
  default: vi.fn(),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('ProtectedRoute 컴포넌트', () => {
  const TestComponent = () => <div>Test Component</div>;

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('로그인이 되어 있지 않은 경우, 로그인 페이지로 이동해야 한다.', () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);
    vi.mocked(useUser).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: null,
      user: undefined,
    });

    render(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    );

    expect(navigate).toBeCalledWith('/login');
  });

  it('로그인이 되어 있는 경우, 자식 컴포넌트를 렌더링해야 한다.', async () => {
    vi.mocked(useUser).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      error: null,
      user: {
        avatar: '',
        id: '',
        nickname: '',
        role: 'authenticated',
      },
    });

    render(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    );

    const result = await screen.findByText('Test Component');

    expect(result).toBeInTheDocument();
  });
});
