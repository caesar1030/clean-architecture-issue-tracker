import { ReactNode } from 'react';

interface InformationTagProps {
  children: ReactNode;
  variant: keyof typeof variants;
}

const base =
  'flex justify-center w-fit content-center items-center gap-1 px-4 rounded-[50px] text-S h-8 w-fit';

const variants = {
  open: 'bg-icon-background-blue text-icon-text',
  closed: 'bg-icon-background-navy text-icon-text',
  writer:
    'bg-neutral-background text-neutral-text-weak border border-neutral-border',
};

const InformationTag = ({ children, variant }: InformationTagProps) => {
  return <div className={[base, variants[variant]].join(' ')}>{children}</div>;
};
export default InformationTag;
