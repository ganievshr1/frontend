import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChatStore } from '../../store/chatStore';
import InputArea from '../input/InputArea';
import MessageList from './MessageList';
import { callGigaChat } from '../../api/gigachat';
import styles from './ChatView.module.css';

const ChatView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    chats,
    activeChatId,
    isLoading,
    error,
    setActiveChat,
    addMessage,
    updateLastMessage,
    setIsLoading,
    setError,
  } = useChatStore();

  const chat = chats.find((c) => c.id === id);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    if (!chat) {
      navigate('/');
      return;
    }
    setActiveChat(id);
  }, [id, chat, navigate, setActiveChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSend = async (content: string) => {
    if (!chat || isLoading) return;

    // Добавляем сообщение пользователя
    addMessage(chat.id, { role: 'user', content });

улируем загрузку
    setIsLoading(true);
    setError(null);

    try {
      // Формируем контекст: system + все сообщения чата + новое user-сообщение
      const context: { role: string; content: string }[] = [
        { role: 'system', content: 'Ты — помощник GigaChat. Отвечай кратко и по делу.' },
        ...chat.messages.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content },
      ];

      const assistantResponse = await callGigaChat(context);

      // Обновляем последнее сообщение (если streaming — будем обновлять по чанкам)
      addMessage(chat.id, { role: 'assistant', content: assistantResponse });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось получить ответ');
    } finally {
      setIsLoading(false);
    }
  };

  if (!chat) {
    return <div className={styles.loading}>Загрузка чата...</div>;
  }

  return (
    <div className={styles.chatView}>
      <header className={styles.header}>
        <h2>{chat.title}</h2>
      </header>

      <MessageList messages={chat.messages} />
      {isLoading && <div className={styles.typing}>🤖 Думаю...</div>}
      <div ref={messagesEndRef} />

      <InputArea onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};

export default ChatView;