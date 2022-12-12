import React, { ChangeEvent } from 'react';

import styles from '../../styles/Input.module.css';

interface Props {
  id: string;
  isTextArea?: boolean;
  label: string;
  min?: HTMLInputElement['min'];
  step?: HTMLInputElement['step'];
  type?: HTMLInputElement['type'];
  tag?: 'input' | 'textarea';
  required?: HTMLInputElement['required'];
  value?: HTMLInputElement['value'];
  onChange(value: HTMLInputElement['value'] | HTMLTextAreaElement['value']): void;
};


const Input: React.FC<Props> = ({
  id, isTextArea, label, type, value, onChange, ...rest 
}) => {
  const Component = isTextArea ? 'textarea' : 'input';

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    onChange?.(e.target.value);

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id}>{label}</label>

      <Component 
        className={styles.input}
        id={id}
        type={type}  
        value={value} 
        onChange={handleOnChange} 
        {...rest}
      />
    </div>
  );
};

export default Input;
