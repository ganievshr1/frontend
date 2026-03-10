import React from 'react';
import styles from './ChatItem.module.css';

interface ChatItemProps {
  title: string;
  date: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ title, date }) => {
  return (
    <div className={styles.chatItem}>
      <div className={styles.title}>{title}</div>
      <div className={styles.date}>{date}</div>
      <div className={styles.actions}>
        <button className={styles.actionBtn}>✏️</button>
        <button className={styles.actionBtn}>🗑️</button>
      </div>
    </div>
  );
};

export default ChatItem;