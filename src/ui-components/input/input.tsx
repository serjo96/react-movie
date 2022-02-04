import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import useDebounce from '~/hooks/use-debounce';

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
  onFocus,
  className,
  type = 'text',
  debounceTimeout,
  placeholder,
  name
}: MyProps) => {
  const inputClass = classNames('input-field', className);
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, debounceTimeout);

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

  const onFocusInput = () => {
    onFocus && onFocus();
  };

  return (
    <input
      className={inputClass}
      onChange={onChangeInput}
      onFocus={onFocusInput}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value || inputValue}
    />
  );
};

export default Input;
