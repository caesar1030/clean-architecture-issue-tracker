import { ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: keyof typeof variants;
  size: keyof typeof sizes;
  children: React.ReactNode;
  flexible?: boolean;
  active?: boolean;
  to?: string;
}

const base =
  'flex gap-1 justify-center items-center flex-shrink-0 hover:opacity-80 active:opacity-[64] disabled:opacity-[32]';

const variants = {
  contained: 'text-accent-text bg-accent-background',
  outline: 'text-accent-text-weak border border-accent-border-weak',
  ghosts: 'text-neutral-text',
};

const sizes = {
  S: 'w-[120px] h-10 text-S font-bold rounded-regular ',
  M: 'w-40 h-10 text-M font-bold rounded-medium ',
  L: 'w-60 h-14 text-L font-bold rounded-large ',
};

function Button({
  variant,
  size,
  flexible,
  active,
  children,
  to,
  ...rest
}: ButtonProps) {
  if (to)
    return (
      <Link
        to={to}
        className={
          [base, variants[variant], sizes[size]].join(' ') +
          `${flexible ? ' flex w-fit h-fit ' : ''}` +
          `${active ? ' text-neutral-text-strong ' : ''}` +
          rest.className
        }
      >
        {children}
      </Link>
    );

  return (
    <button
      {...rest}
      className={
        [base, variants[variant], sizes[size]].join(' ') +
        `${flexible ? ' flex w-fit h-fit ' : ''}` +
        `${active ? ' text-neutral-text-strong ' : ''}` +
        rest.className
      }
    >
      {children}
    </button>
  );
}
export default Button;
