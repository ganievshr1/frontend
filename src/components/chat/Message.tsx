import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Message.module.css';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({ role, content, timestamp }) => {
  return (
    <div className={`${styles.message} ${styles[role]}`}>
      {role === 'assistant' && <div className={styles.avatar}>🤖</div>}
      <div className={styles.content}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        <div className={styles.timestamp}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Message;