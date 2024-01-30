import { ComponentPropsWithoutRef } from 'react';
import { Label } from '../../domain/model/label/label';

interface LabelProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  textColor: string;
  backgroundColor: Label['backgroundColor'];
}

function LabelTag({ children, textColor, backgroundColor }: LabelProps) {
  return (
    <div
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
      }}
      className="px-4 rounded-[50px] w-fit"
    >
      {children}
    </div>
  );
}
export default LabelTag;
