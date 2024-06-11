import {
  ReactNode,
  createContext,
  useContext,
  useState,
  ComponentProps,
  ChangeEvent,
  forwardRef,
} from 'react';
import searchIcon from '@/assets/search.svg';

interface FilterContextType {
  isFocused: boolean;
  focus: () => void;
  blur: () => void;
}

const FilterBarContext = createContext<FilterContextType>(null!);

interface FilterBarProps {
  children: ReactNode;
}

interface SearchFilterProps {
  children: ReactNode;
}

interface InputProps extends ComponentProps<'input'> {}

const FilterBar = ({ children }: FilterBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const focus = () => {
    setIsFocused(true);
  };

  const blur = () => {
    setIsFocused(false);
  };

  return (
    <FilterBarContext.Provider value={{ isFocused, focus, blur }}>
      <div className="flex w-[600px] h-10 border border-solid border-neutral-border rounded-regular overflow-hidden">
        {children}
      </div>
    </FilterBarContext.Provider>
  );
};

const SearchFilter = ({ children }: SearchFilterProps) => {
  const { isFocused } = useContext(FilterBarContext);

  return (
    <div
      className={`flex justify-center items-center h-full w-32 ${
        isFocused ? 'bg-neutral-background-strong' : 'bg-neutral-background'
      } text-neutral-text-weak`}
    >
      {children}
    </div>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isFocused, focus, blur } = useContext(FilterBarContext);
  const [inputValue, setInputValue] = useState('');

  const handleFocus = () => {
    if (!inputValue && props.placeholder) {
      setInputValue(props.placeholder);
    }
    focus();
  };

  const handleBlur = () => {
    blur();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 grow ${
        isFocused
          ? 'bg-neutral-background-strong'
          : 'bg-neutral-background-bold'
      }`}
    >
      <label htmlFor="search-input">
        <img
          width={16}
          height={16}
          src={searchIcon}
          alt="검색"
          className="w-4 h-4"
        />
      </label>
      <input
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        onChange={handleChange}
        className={`w-[400px] h-full focus:outline-none bg-inherit placeholder:text-neutral-text-weak ${
          isFocused
            ? 'bg-neutral-background-strong text-neutral-text-strong'
            : 'bg-neutral-background-bold text-neutral-text-weak'
        }`}
        ref={ref}
        id="search-input"
        {...props}
      />
    </div>
  );
});

FilterBar.SearchFilter = SearchFilter;
FilterBar.Input = Input;

export default FilterBar;
