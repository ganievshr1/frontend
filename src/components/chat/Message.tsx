import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Message.module.css';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({ role, content, timestamp }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`${styles.message} ${styles[role]}`}>
      {role === 'assistant' && (
        <div className={styles.avatar}>
          🤖
        </div>
      )}
      <div className={styles.content}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        <div className={styles.timestamp}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {role === 'assistant' && (
        <button
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label="Скопировать сообщение"
        >
          {isCopied ? '✅ Скопировано' : '📋'}
        </button>
      )}
    </div>
  );
};

export default Message;