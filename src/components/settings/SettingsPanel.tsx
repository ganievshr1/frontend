import React, { useState, useEffect } from 'react';
import styles from './SettingsPanel.module.css';
import Toggle from '../ui/Toggle';
import Slider from '../ui/Slider';
import Button from '../ui/Button';

const SettingsPanel: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  const [model, setModel] = useState('GigaChat');
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [systemPrompt, setSystemPrompt] = useState('');

  // Сохраняем тему в localStorage и обновляем атрибут
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleReset = () => {
    setModel('GigaChat');
    setTemperature(0.7);
    setTopP(0.9);
    setMaxTokens(1024);
    setSystemPrompt('');
  };

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Настройки</h3>

      {/* Тема */}
      <div className={styles.section}>
        <label className={styles.label}>Тема</label>
        <Toggle
          checked={theme === 'dark'}
          onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        />
      </div>

      {/* Модель */}
      <div className={styles.section}>
        <label className={styles.label}>Модель</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className={styles.select}
        >
          <option value="GigaChat">GigaChat</option>
          <option value="GigaChat-Plus">GigaChat-Plus</option>
          <option value="GigaChat-Pro">GigaChat-Pro</option>
          <option value="GigaChat-Max">GigaChat-Max</option>
        </select>
      </div>

      {/* Temperature */}
      <div className={styles.section}>
        <label className={styles.label}>
          Temperature: {temperature.toFixed(1)}
        </label>
        <Slider
          min={0}
          max={2}
          step={0.1}
          value={temperature}
          onChange={setTemperature}
        />
      </div>

      {/* Top-P */}
      <div className={styles.section}>
        <label className={styles.label}>
          Top-P: {topP.toFixed(2)}
        </label>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={topP}
          onChange={setTopP}
        />
      </div>

      {/* Max Tokens */}
      <div className={styles.section}>
        <label className={styles.label}>
          Max Tokens: {maxTokens}
        </label>
        <input
          type="number"
          min="1"
          max="8192"
          value={maxTokens}
          onChange={(e) => setMaxTokens(Number(e.target.value))}
          className={styles.inputNumber}
        />
      </div>

      {/* System Prompt */}
      <div className={styles.section}>
        <label className={styles.label}>System Prompt</label>
        <textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="Введите системный промпт..."
          rows={3}
          className={styles.textarea}
        />
      </div>

      {/* Кнопки */}
      <div className={styles.buttons}>
        <Button variant="secondary" onClick={handleReset}>
          Сбросить
        </Button>
        <Button variant="primary">
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;