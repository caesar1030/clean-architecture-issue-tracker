import Button from '@/common-ui/button';
import { render } from '@/tests/utils/render-with-context';
import userEvent from '@testing-library/user-event';

describe('Button 컴포넌트', () => {
  describe('링크로 동작하는 경우', () => {
    it('to prop이 주어질 경우, Button이 아닌 Link로써 동작해야 한다.', () => {
      const { getByRole, queryByRole } = render(
        <Button to="/some-path">링크</Button>
      );

      expect(getByRole('link')).toBeInTheDocument();
      expect(queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('버튼으로 동작하는 경우', () => {
    it('HTML의 <button>이 지원하는 prop이 주어질 경우, 동일하게 동작해야 한다.', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      const { getByRole } = render(<Button onClick={onClick}>버튼</Button>);
      const button = getByRole('button');
      await user.click(button);

      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});
