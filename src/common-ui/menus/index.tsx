import {
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import useOutsideClick from '@/hooks/use-outside-click';

const WINDOW_WIDTH = 240;

interface Position {
  x: number;
  y: number;
}

interface MenuContextType {
  openedId: string;
  open: (id: string) => void;
  close: () => void;
  position: Position;
  setPosition: Dispatch<SetStateAction<Position>>;
}

interface MenuProps {
  children: ReactNode;
}

interface TriggerProps {
  id: string;
  children: ReactNode;
  windowPosition?: 'left' | 'center' | 'right';
}

interface WindowProps {
  id: string;
  children: ReactNode;
}

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

const MenuContext = createContext<MenuContextType>(null!);

const Menus = ({ children }: MenuProps) => {
  const [openedId, setOpenedId] = useState('');
  const [position, setPosition] = useState<Position>(null!);

  const open = (id: string) => setOpenedId(id);
  const close = () => setOpenedId('');

  useEffect(() => {
    const handleScroll = () => {
      close();
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [close]);

  return (
    <MenuContext.Provider
      value={{ openedId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const Trigger = ({ id, children, windowPosition }: TriggerProps) => {
  const { openedId, open, close, setPosition } = useContext(MenuContext);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLDivElement)
      .closest(`#${id}`)
      ?.getBoundingClientRect();

    let x = rect!.x;
    if (windowPosition === 'center') x -= (WINDOW_WIDTH - rect!.width) / 2;
    if (windowPosition === 'right') x -= WINDOW_WIDTH - rect!.width;
    const y = rect!.y + rect!.height + 8;

    setPosition({ x, y });

    !openedId || openedId !== id ? open(id) : close();
  };

  return (
    <div aria-haspopup={'menu'} id={id} onClick={handleClick}>
      {children}
    </div>
  );
};

const Window = ({ id, children }: WindowProps) => {
  const { openedId, position, close } = useContext(MenuContext);
  const windowRef = useOutsideClick<HTMLDivElement>(close);

  if (openedId !== id) return null;

  return createPortal(
    <menu
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${WINDOW_WIDTH}px`,
      }}
      className={`fixed`}
      ref={windowRef}
    >
      {children}
    </menu>,
    document.body
  );
};

const Button = ({ onClick, children }: ButtonProps) => {
  const { close } = useContext(MenuContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <button onClick={handleClick} className="text-start">
      {children}
    </button>
  );
};

Menus.Trigger = Trigger;
Menus.Window = Window;
Menus.Button = Button;

export default Menus;
