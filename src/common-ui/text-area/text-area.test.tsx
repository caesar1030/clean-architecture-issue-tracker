import TextArea from '@/common-ui/text-area';
import { render } from '@/tests/utils/render-with-context';
import userEvent from '@testing-library/user-event';

describe('TextArea 컴포넌트', () => {
  it('HTML의 <textarea>가 지원하는 prop이 주어질 경우, 동일하게 동작해야 한다.', () => {
    const placeHolder = '플레이스홀더';
    const { getByPlaceholderText } = render(
      <TextArea label="label" placeholder={placeHolder} />
    );

    expect(getByPlaceholderText(placeHolder)).toBeInTheDocument();
  });

  it('값이 변할 경우, 주어진 onChange가 호출되어야 한다.', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <TextArea label="label" onChange={onChange} />
    );
    const textarea = getByRole('textbox');
    await user.clear(textarea);
    await user.type(textarea, '123');

    expect(onChange).toBeCalledTimes(3);
  });

  it('error prop이 주어질 경우, 에러 메세지가 존재해야 한다.', () => {
    const errorMessage = '에러 메세지';
    const { getByRole } = render(
      <TextArea label="label" error={errorMessage} />
    );

    expect(getByRole('alert')).toBeInTheDocument();
  });
});
