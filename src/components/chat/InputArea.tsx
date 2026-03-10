import React from 'react';
import styles from './InputArea.module.css';
import Button from '../ui/Button';

const InputArea: React.FC = () => {
  const [input, setInput] = React.useState('');

  const handleSend = () => {
    if (input.trim()) {
      console.log('Send:', input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.inputArea}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Напишите сообщение..."
        className={styles.textarea}
        rows={1}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = Math.min(target.scrollHeight, 120) + 'px';
        }}
      />
      <div className={styles.buttons}>
        <Button disabled={!input.trim()}>📤</Button>
        <Button variant="secondary">⏹️</Button>
        <Button variant="secondary">📎</Button>
      </div>
    </div>
  );
};

export default InputArea;