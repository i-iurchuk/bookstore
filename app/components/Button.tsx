import { PropsWithChildren, MouseEvent } from 'react';

import styles from '../../styles/Button.module.css';

interface Props extends PropsWithChildren {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ className, ...rest}) => 
  <button className={`${styles.btn} ${className}`} {...rest}/>;

export default Button;
