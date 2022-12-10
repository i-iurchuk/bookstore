import React, { ChangeEvent } from 'react';

import './Input.css';

interface Props {
  id: string;
  isTextArea?: boolean;
  label: string;
  type?: string;
  tag?: 'input' | 'textarea';
  min?: string;
  step?: string;
  value?: HTMLInputElement['value'];
  onChange(value: HTMLInputElement['value'] | HTMLTextAreaElement['value']): void;
}


const Input: React.FC<Props> = ({
  id, isTextArea, label, type, value, onChange, ...rest 
}) => {
  const Component = isTextArea ? 'textarea' : 'input';

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    onChange?.(e.target.value);

  return (
    <div className='input-wrapper'>
      <label htmlFor={id}>{label}</label>
      <Component 
        className='input'
        id={id}
        type={type} 
        required 
        value={value} 
        onChange={handleOnChange} 
        {...rest}
      />
    </div>
  );
};

export default Input;
