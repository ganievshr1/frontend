import React, { useState, useRef } from 'react';
import styles from './InputArea.module.css';
import Button from '../ui/Button';

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
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Перенос строки
        return;
      }
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    // Автоподстройка высоты (до 5 строк ≈ 120px)
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
          <Button variant="secondary" disabled>
            ⏹️ Стоп
          </Button>
        ) : (
          <Button
            variant="primary"
            disabled={!input.trim()}
            onClick={handleSubmit}
          >
            📤 Отправить
          </Button>
        )}
        <Button variant="secondary" disabled={isLoading}>
          📎 Прикрепить
        </Button>
      </div>
    </div>
  );
};

export default InputArea;