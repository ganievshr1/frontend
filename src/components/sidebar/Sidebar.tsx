import React from 'react';
import styles from './Sidebar.module.css';
import SearchInput from './SearchInput';
import ChatList from './ChatList';
import Button from '../ui/Button';

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <Button>➕ Новый чат</Button>
      <SearchInput />
      <div className={styles.list}>
        <ChatList />
      </div>
    </aside>
  );
};

export default Sidebar;