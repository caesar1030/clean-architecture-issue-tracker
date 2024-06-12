import CheckIndicator from '@/common-ui/check-indicator';
import { render } from '@/tests/test-utils/render-with-context';

describe('CehckIndicator 컴포넌트', () => {
  it('checked가 true로 주어질 경우 check된 상태로 표시되어야 한다.', () => {
    const { getByRole } = render(<CheckIndicator checked={true} />);

    expect(getByRole('checkbox')).toBeChecked();
  });

  it('checked가 false로 주어질 경우 check 되지 않은 상태로 표시되어야 한다.', () => {
    const { getByRole } = render(<CheckIndicator checked={false} />);

    expect(getByRole('checkbox')).not.toBeChecked();
  });
});
