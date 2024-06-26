import { Label } from '@/services/label/label';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface LabelProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  textColor: string;
  backgroundColor: Label['backgroundColor'];
}

const LabelTag = ({ children, textColor, backgroundColor }: LabelProps) => {
  return (
    <div
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
      }}
      className="px-4 rounded-[50px] w-fit max-w-[200px] overflow-hidden"
    >
      {children}
    </div>
  );
};
export default LabelTag;
