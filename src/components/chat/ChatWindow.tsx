import React from 'react';
import styles from './ChatWindow.module.css';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';
import InputArea from '../input/InputArea';

const ChatWindow: React.FC = () => {
  return (
    <main className={styles.chatWindow}>
      <header className={styles.header}>
        <h2>План проекта</h2>
        <button className={styles.settingsBtn}>⚙️</button>
      </header>
      <MessageList />
      <TypingIndicator isVisible={true} />
      <InputArea />
    </main>
  );
};

export default ChatWindow;