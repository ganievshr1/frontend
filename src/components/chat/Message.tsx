import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Message.module.css';

interface MessageProps {
  content: string;
  role: 'user' | 'assistant';
}

const Message: React.FC<MessageProps> = ({ content, role }) => {
  return (
    <div className={`${styles.message} ${styles[role]}`}>
      {role === 'assistant' && <div className={styles.avatar}>🤖</div>}
      <div className={styles.content}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
      <button className={styles.copyBtn}>📋</button>
    </div>
  );
};

export default Message;