import React from 'react';
import ChatItem from './ChatItem';

const mockChats = [
  { id: '1', title: 'План проекта', date: '10:30' },
  { id: '2', title: 'Идеи для стартапа', date: 'Вчера' },
  { id: '3', title: 'Как работает нейросеть?', date: 'Пн' },
  { id: '4', title: 'Рецепт пасты карбонара', date: 'Сб' },
  { id: '5', title: 'Объяснение квантовой физики', date: '20 мар' },
];

const ChatList: React.FC = () => {
  return (
    <>
      {mockChats.map((chat) => (
        <ChatItem key={chat.id} title={chat.title} date={chat.date} />
      ))}
    </>
  );
};

export default ChatList;