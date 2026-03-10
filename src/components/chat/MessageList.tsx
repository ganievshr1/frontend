import React from 'react';
import Message from './Message';

const mockMessages = [
  { id: 1, role: 'assistant' as const, content: 'Привет! Чем могу помочь?' },
  { id: 2, role: 'user' as const, content: 'Объясни, как работает GigaChat.' },
  { id: 3, role: 'assistant' as const, content: 'GigaChat — это **LLM** от Сбера.\n\n- Поддерживает диалог\n- Понимает контекст\n- Может генерировать код\n\nХочешь пример?' },
  { id: 4, role: 'user' as const, content: 'Да, покажи код на Python.' },
  { id: 5, role: 'assistant' as const, content: '```python\nprint("Hello, GigaChat!")\n```' },
  { id: 6, role: 'user' as const, content: 'Спасибо!' },
];

const MessageList: React.FC = () => {
  return (
    <div className="messageList">
      {mockMessages.map((msg) => (
        <Message key={msg.id} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
};

export default MessageList;