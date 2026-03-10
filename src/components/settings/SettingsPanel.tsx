import React from 'react';
import styles from './SettingsPanel.module.css';
import Slider from '../ui/Slider';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';

const SettingsPanel: React.FC = () => {
  const [temperature, setTemperature] = React.useState(0.7);
  const [topP, setTopP] = React.useState(0.9);
  const [maxTokens, setMaxTokens] = React.useState(1024);
  const [systemPrompt, setSystemPrompt] = React.useState('Ты — полезный ассистент.');
  const [theme, setTheme] = React.useState(false);

  return (
    <div className={styles.panel}>
      <h2>Настройки</h2>
      
      <label>
        Модель:
        <select className={styles.select}>
          <option>GigaChat</option>
          <option>GigaChat-Plus</option>
          <option>GigaChat-Pro</option>
          <option>GigaChat-Max</option>
        </select>
      </label>

      <Slider label="Temperature" value={temperature} min={0} max={2} onChange={setTemperature} />
      <Slider label="Top-P" value={topP} min={0} max={1} step={0.01} onChange={setTopP} />
      
      <label>
        Max Tokens:
        <input
          type="number"
          value={maxTokens}
          onChange={(e) => setMaxTokens(Number(e.target.value))}
          className={styles.numberInput}
        />
      </label>

      <label>
        System Prompt:
        <textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          className={styles.textarea}
        />
      </label>

      <div className={styles.themeToggle}>
        Светлая тема
        <Toggle checked={!theme} onChange={() => setTheme(!theme)} />
        Тёмная тема
      </div>

      <div className={styles.buttons}>
        <Button>Сохранить</Button>
        <Button variant="secondary">Сбросить</Button>
      </div>
    </div>
  );
};

export default SettingsPanel;