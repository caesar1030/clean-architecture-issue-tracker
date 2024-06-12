import Menus from '@/common-ui/menus';
import { render } from '@/tests/test-utils/render-with-context';
import userEvent from '@testing-library/user-event';

describe('Menus 컴포넌트', () => {
  it('최초 렌더링 시, 트리거는 존재해야 한다. 윈도우는 존재하지 않아야 한다.', () => {
    const { queryByText, getByText } = render(
      <Menus>
        <Menus.Trigger id="id1">트리거</Menus.Trigger>
        <Menus.Window id="id1">윈도우</Menus.Window>
      </Menus>
    );

    expect(getByText('트리거')).toBeInTheDocument();
    expect(queryByText('윈도우')).not.toBeInTheDocument();
  });

  it('트리거를 클릭하면, 윈도우는 존재해야 한다.', async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <Menus>
        <Menus.Trigger id="id1">트리거</Menus.Trigger>
        <Menus.Window id="id1">윈도우</Menus.Window>
      </Menus>
    );

    await user.click(getByText('트리거'));

    expect(getByText('윈도우')).toBeInTheDocument();
  });

  it('윈도우가 존재할 경우, 외부를 클릭하면 윈도우는 사라져야 한다.', async () => {
    const user = userEvent.setup();
    const { queryByText, getByText } = render(
      <>
        <div>외부 영역</div>
        <Menus>
          <Menus.Trigger id="id1">트리거</Menus.Trigger>
          <Menus.Window id="id1">윈도우</Menus.Window>
        </Menus>
      </>
    );

    await user.click(getByText('트리거'));

    expect(queryByText('윈도우')).toBeInTheDocument();

    await user.click(getByText('외부 영역'));

    expect(queryByText('윈도우')).not.toBeInTheDocument();
  });

  it('최대 1개의 윈도우만 화면에 존재해야 한다.', async () => {
    const user = userEvent.setup();
    const { queryByText, getByText } = render(
      <Menus>
        <Menus.Trigger id="id1">트리거1</Menus.Trigger>
        <Menus.Window id="id1">윈도우1</Menus.Window>

        <Menus.Trigger id="id2">트리거2</Menus.Trigger>
        <Menus.Window id="id2">윈도우2</Menus.Window>
      </Menus>
    );

    await user.click(getByText('트리거1'));

    expect(queryByText('윈도우1')).toBeInTheDocument();
    expect(queryByText('윈도우2')).not.toBeInTheDocument();

    await user.click(getByText('트리거2'));

    expect(queryByText('윈도우1')).not.toBeInTheDocument();
    expect(queryByText('윈도우2')).toBeInTheDocument();
  });
});
