import Checkbox from '@/common-ui/checkbox';
import { render } from '@/tests/utils/render-with-context';
import userEvent from '@testing-library/user-event';

describe('Checkbox 컴포넌트', () => {
  it('클릭할 경우, 주어진 onChange가 호출되어야 한다.', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <Checkbox id="id" label="label" onChange={onChange} />
    );
    const checkbox = getByRole('checkbox');
    await user.click(checkbox);

    expect(onChange).toHaveBeenCalledOnce();
  });
});
