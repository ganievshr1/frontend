import React from 'react';
import styles from './AppLayout.module.css';
import Sidebar from '../sidebar/Sidebar';
import ChatWindow from '../chat/ChatWindow';

const AppLayout: React.FC = () => {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

export default AppLayout;