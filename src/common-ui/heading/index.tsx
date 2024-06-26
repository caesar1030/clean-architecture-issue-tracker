import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
}

const Heading = ({ children }: HeadingProps) => {
  return <h1 className="text-neutral-text-strong text-XXL">{children}</h1>;
};

export default Heading;
