import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';
import InputArea from '../input/InputArea';
import styles from './ChatWindow.module.css';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Привет! Чем могу помочь?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date(), // ← не забудь запятую
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Вы написали: "${content}".\n\nКак я могу помочь дальше?`,
        timestamp: new Date(), // ← не забудь запятую
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className={styles.chatWindow}>
      <header className={styles.header}>
        <h2>План проекта</h2>
        <button className={styles.settingsBtn}>⚙️</button>
      </header>

      <MessageList messages={messages} />
      {isLoading && <TypingIndicator isVisible={true} />}
      <div ref={messagesEndRef} />

      <InputArea onSend={handleSend} isLoading={isLoading} />
    </main>
  ); // ← не забудь закрыть return
}; // ← и компонент

export default ChatWindow;