import React, { useState } from 'react';
import styles from './InputArea.module.css';
import Button from '../ui/Button';

interface InputAreaProps {
  onSend: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
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
        disabled={isLoading}
        onInput={(e) => {
          const el = e.target as HTMLTextAreaElement;
          el.style.height = 'auto';
          el.style.height = Math.min(el.scrollHeight, 120) + 'px';
        }}
      />
      <div className={styles.buttons}>
        <Button
          variant="primary"
          disabled={!input.trim() || isLoading}
          onClick={handleSubmit}
        >
          📤
        </Button>
        <Button variant="secondary" disabled={isLoading}>
          ⏹️
        </Button>
        <Button variant="secondary" disabled={isLoading}>
          📎
        </Button>
      </div>
    </div>
  );
};

export default InputArea;