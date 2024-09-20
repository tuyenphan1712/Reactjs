import React from 'react';
import styles from './styles.module.scss'

const Button = ({children}) => {
    return (
      <button className={styles.btn} >
          {children}
      </button>
    );
};

export { Button };