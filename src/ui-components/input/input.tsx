import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import useDebounce from '~/hooks/use-debounce';
import { usePrevious } from '~/hooks/usePrevious';

interface MyProps{
  value: string;
  placeholder?: string;
  name?: string;
  onChange: (value: string) => void;
  onInput?: (value: string) => void;
  onFocus?: () => void;
  onKeyDown?: (key: string) => void;
  className?: string;
  type?: HTMLInputElement['type']
  debounceTimeout?: number
}

const Input = ({
  value,
  onChange,
  onInput,
  onFocus,
  onKeyDown,
  className,
  type = 'text',
  debounceTimeout,
  placeholder,
  name
}: MyProps) => {
  const inputClass = classNames('input-field', className);
  const [inputValue, setInputValue] = useState(value || '');
  const prevProps = usePrevious(value);
  const debouncedSearchTerm = useDebounce(inputValue, debounceTimeout);

  useEffect(() => {
    if (typeof value !== 'undefined' && prevProps !== value && inputValue !== value) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (debounceTimeout && debouncedSearchTerm) {
      onChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const onChangeInput = (event : React.ChangeEvent<HTMLInputElement>) => {
    if (debounceTimeout) {
      setInputValue(event.target.value);
    } else {
      onChange(event.target.value);
    }
  };

  const onComponentInput = (event : React.ChangeEvent<HTMLInputElement>) => {
    onInput && onInput(event.target.value);
  };

  const onFocusInput = () => {
    onFocus && onFocus();
  };

  const onKeyDownInput = (event: React.KeyboardEvent) => {
    onKeyDown && onKeyDown(event.key);
  };

  return (
    <input
      className={inputClass}
      onChange={onChangeInput}
      onInput={onComponentInput}
      onFocus={onFocusInput}
      onKeyDown={onKeyDownInput}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value || inputValue}
    />
  );
};

export default Input;
