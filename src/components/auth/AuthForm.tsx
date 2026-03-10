import React from 'react';
import styles from './AuthForm.module.css';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';


const AuthForm: React.FC = () => {
  const [credentials, setCredentials] = React.useState('');
  const [scope, setScope] = React.useState('GIGACHAT_API_PERS');
  const [error, setError] = React.useState('');

  const handleSubmit = () => {
    if (!credentials.trim()) {
      setError('Поле не может быть пустым');
      return;
    }
    setError('');
    alert('Форма отправлена (мок)');
  };

  return (
    <div className={styles.authForm}>
      <h1>Авторизация</h1>
      <input
        type="password"
        placeholder="Введите Base64-токен"
        className={styles.input}
        value={credentials}
        onChange={(e) => setCredentials(e.target.value)}
      />
      {error && <ErrorMessage message={error} />}
      
      <div className={styles.scopeGroup}>
        {['GIGACHAT_API_PERS', 'GIGACHAT_API_B2B', 'GIGACHAT_API_CORP'].map((opt) => (
          <label key={opt} className={styles.radioLabel}>
            <input
              type="radio"
              name="scope"
              value={opt}
              checked={scope === opt}
              onChange={() => setScope(opt)}
            />
            {opt}
          </label>
        ))}
      </div>

      <Button onClick={handleSubmit}>Войти</Button>
    </div>
  );
};

export default AuthForm;