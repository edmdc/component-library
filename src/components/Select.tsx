import React, { useState } from 'react';
import styles from '../styles/Select.module.css';
import Month from '../utilities/Month';

interface SelectProps {
  optionValues: string[];
  value: Month;
  setValue: (val: Month) => void;
}

const Select: React.FC<SelectProps> = ({ optionValues, value, setValue }) => {
  const [isOpen, toggleView] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onClick={(): void => toggleView(!isOpen)}
      onMouseLeave={(): void => toggleView(false)}
    >
      <div className={`${styles.select} ${isOpen ? styles.open : ''}`}>
        <div className={styles.trigger}>
          <span>{value.name}</span>
          <div className={styles.arrow}></div>
        </div>
        <div className={styles.options}>
          {optionValues.map((option, index) => (
            <span
              key={index}
              className={styles.option}
              onClick={(): void => {
                setValue(new Month(option));
                toggleView(!isOpen);
              }}
            >
              {option}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
