import Input from '@/common-ui/input';
import { render } from '@/tests/test-utils/render-with-context';
import userEvent from '@testing-library/user-event';

describe('Input 컴포넌트', () => {
  it('HTML의 <input>이 지원하는 prop이 주어질 경우, 동일하게 동작해야 한다.', () => {
    const placeHolder = '플레이스홀더';
    const { getByPlaceholderText } = render(
      <Input id="id" label="label" placeholder={placeHolder} />
    );

    expect(getByPlaceholderText(placeHolder)).toBeInTheDocument();
  });

  it('값이 변할 경우, 주어진 onChange가 호출되어야 한다.', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <Input id="id" label="label" onChange={onChange} />
    );

    const input = getByRole('textbox');
    await user.clear(input);
    await user.type(input, '123');

    expect(onChange).toBeCalledTimes(3);
  });

  it('error prop이 주어질 경우, 에러 메세지가 존재해야 한다.', () => {
    const errorMessage = '에러 메세지';
    const { getByRole } = render(
      <Input id="id" label="label" error={errorMessage} />
    );
    expect(getByRole('alert')).toBeInTheDocument();
  });
});
