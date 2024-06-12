import FilterBar from '@/common-ui/filter-bar';
import { render } from '@/tests/test-utils/render-with-context';
import userEvent from '@testing-library/user-event';

describe('FilterBar 컴포넌트', () => {
  it('값이 변할 경우, 주어진 onChange가 호출되어야 한다.', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <FilterBar>
        <FilterBar.Input onChange={onChange}></FilterBar.Input>
      </FilterBar>
    );

    const input = getByRole('textbox');
    await user.clear(input);
    await user.type(input, '123');

    expect(onChange).toBeCalledTimes(3);
  });
});
