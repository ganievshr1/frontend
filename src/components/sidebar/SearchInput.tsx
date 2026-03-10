import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput: React.FC = () => {
  return (
    <input
      type="text"
      placeholder="Поиск чатов..."
      className={styles.input}
    />
  );
};

export default SearchInput;