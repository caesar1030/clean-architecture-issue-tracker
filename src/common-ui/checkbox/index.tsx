import { ComponentPropsWithoutRef } from 'react';

interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  id: string;
  label: string;
}

const Checkbox = ({ label, id, ...rest }: CheckboxProps) => {
  return (
    <label htmlFor={id}>
      <span className="sr-only">{label}</span>
      <input id={id} type="checkbox" className="w-4 h-4" {...rest} />
    </label>
  );
};

export default Checkbox;
