import React from 'react';
import Message from './Message';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <div className={styles.empty}>
        <div>💬</div>
        <p>Начните новый диалог</p>
      </div>
    );
  }

  return (
    <div className={styles.messageList}>
      {messages.map((msg) => (
        <Message
          key={msg.id}
          role={msg.role}
          content={msg.content}
          timestamp={msg.timestamp}
        />
      ))}
    </div>
  );
};

export default MessageList;