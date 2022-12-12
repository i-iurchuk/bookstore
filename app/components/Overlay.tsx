import { PropsWithChildren } from 'react';
import styles from '../../styles/EditBookModal.module.css';

const Overlay: React.FC<PropsWithChildren> = ({ children }) =>
  <div className={styles.overlay}>
    {children}
  </div>

export default Overlay;
