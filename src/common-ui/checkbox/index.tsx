import { ComponentPropsWithoutRef } from 'react';

interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {}

const Checkbox = ({ ...rest }: CheckboxProps) => {
  return <input type="checkbox" className="w-4 h-4" {...rest} />;
};

export default Checkbox;
