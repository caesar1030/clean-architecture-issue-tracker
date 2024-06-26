import ErrorMessage from '@/common-ui/error-message';
import {
  ComponentProps,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  useState,
} from 'react';

interface InputProps extends ComponentProps<'input'> {
  id: string;
  label: string;
  labelPosition?: keyof typeof labelPositions;
  error?: string;
}

const labelPositions = {
  top: 'flex-col',
  left: 'gap-2',
};

const Input = forwardRef(
  (
    { label, labelPosition = 'left', id, error, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { value, onChange } = rest;
    const [isFouced, setIsFocused] = useState(false);
    const isLabelAtTop = labelPosition === 'top';
    const isLabelAtLeft = labelPosition === 'left';
    const isInputValue = value;

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      rest.onFocus?.(e);
      setIsFocused(true);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      rest.onBlur?.(e);
      setIsFocused(false);
    };

    return (
      <div>
        <div
          className={
            ' flex items-center px-6 rounded-medium h-14' +
            ` ${labelPosition === 'top' ? 'flex-col' : ''}` +
            ` ${labelPosition === 'left' ? 'gap-2' : ''}` +
            `${
              isFouced
                ? ' bg-neutral-background-strong border border-neutral-border-active'
                : ' bg-neutral-background-bold border border-neutral-background-bold'
            }` +
            ` ${rest.className}`
          }
        >
          <label
            htmlFor={id}
            className={
              'flex items-center cursor-text text-neutral-text focus:text-neutral-text-weak whitespace-nowrap ' +
              ` ${isLabelAtLeft ? 'min-w-[110px]' : ''}` +
              ` ${isLabelAtTop ? 'w-full' : ''}` +
              ` ${isLabelAtTop && !value && !isFouced ? 'grow' : ''}` +
              ` ${isLabelAtTop && (isInputValue || isFouced) ? 'h-5 text-S' : ''}`
            }
          >
            {label}
          </label>

          <input
            {...rest}
            id={id}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChange={onChange}
            className={
              'w-full bg-inherit focus:outline-none text-neutral-text-strong text-M' +
              ` ${isLabelAtLeft ? 'grow' : ''}` +
              ` ${isLabelAtTop && !isInputValue && !isFouced ? 'h-0' : ''}` +
              ` ${isLabelAtTop && (isInputValue || isFouced) ? 'h-7' : ''}`
            }
          />
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

export default Input;
