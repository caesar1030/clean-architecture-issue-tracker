import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface ErrorMessageProps extends ComponentPropsWithoutRef<'span'> {
  children: ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <span role="alert" className="text-danger-text text-S font-medium">
      {children}
    </span>
  );
};

export default ErrorMessage;
