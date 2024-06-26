import {
  ComponentPropsWithoutRef,
  ReactNode,
  createContext,
  useContext,
} from 'react';

interface TableContextType {
  columns: string;
  size: keyof typeof sizes;
}

interface TableProps {
  columns: string;
  children: ReactNode;
  size?: keyof typeof sizes;
}

interface HeaderProps {
  children: ReactNode;
}

interface BodyProps<T> {
  data: T[] | undefined;
  render: (item: T) => ReactNode;
}

interface RowProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

const sizes = {
  S: ' gap-2 py-2 px-4 ',
  L: ' gap-8 py-4 px-8 ',
};

const TableContext = createContext<TableContextType>(null!);

const Table = ({ columns, children, size = 'L' }: TableProps) => {
  return (
    <TableContext.Provider value={{ columns, size }}>
      <div
        role="table"
        className="border border-solid border-neutral-border rounded-large overflow-hidden bg-neutral-background-strong"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

const Header = ({ children }: HeaderProps) => {
  const { columns, size } = useContext(TableContext);

  return (
    <div
      role="rowheader"
      style={{ gridTemplateColumns: columns }}
      className={`grid items-center ${sizes[size]} bg-neutral-background border-b border-solid border-neutral-border`}
    >
      {children}
    </div>
  );
};

const Body = <T,>({ data, render }: BodyProps<T>) => {
  if (!data || data.length === 0) {
    return (
      <p role="row" className="text-center m-6 ">
        표시할 항목이 없습니다.
      </p>
    );
  }

  return (
    <div role="rowgroup" className="bg-neutral-background-strong">
      {data.map(render)}
    </div>
  );
};

const Row = ({ children, ...rest }: RowProps) => {
  const { columns, size } = useContext(TableContext);

  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns }}
      className={`grid ${sizes[size]} border-b last:border-b-0 border-solid border-neutral-border bg-neutral-background-strong ${rest.className}`}
    >
      {children}
    </div>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
