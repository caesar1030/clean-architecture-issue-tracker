import Checkbox from '@/common-ui/checkbox';
import { render } from '@/tests/test-utils/render-with-context';
import userEvent from '@testing-library/user-event';

describe('Checkbox 컴포넌트', () => {
  it('checked가 true로 주어질 경우 check 된 상태여야 한다.', () => {
    const { getByRole } = render(
      <Checkbox id="id" label="label" checked={true}></Checkbox>
    );

    expect(getByRole('checkbox')).toBeChecked();
  });

  it('checked가 false로 주어질 경우 check 되지 않은 상태여야 한다.', () => {
    const { getByRole } = render(
      <Checkbox id="id" label="label" checked={false}></Checkbox>
    );

    expect(getByRole('checkbox')).not.toBeChecked();
  });

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
