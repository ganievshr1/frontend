import React, { useState, useRef } from 'react';
import styles from './InputArea.module.css';

interface InputAreaProps {
  onSend: (content: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  return (
    <div className={styles.inputArea}>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Напишите сообщение..."
        className={styles.textarea}
        rows={1}
        disabled={isLoading}
      />
      <div className={styles.buttons}>
        {isLoading ? (
          <button className={`${styles.button} ${styles.secondary}`} disabled>
            ⏹️ Стоп
          </button>
        ) : (
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={handleSubmit}
            disabled={!input.trim()}
          >
            📤 Отправить
          </button>
        )}
        <button className={`${styles.button} ${styles.secondary}`} disabled={isLoading}>
          📎
        </button>
      </div>
    </div>
  );
};

export default InputArea;