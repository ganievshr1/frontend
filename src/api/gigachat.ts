const BASE_URL = 'https://api.sber.ru/prod/gigachat/v1';

export interface GigaChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GigaChatRequest {
  model: string;
  messages: GigaChatMessage[];
  stream?: boolean;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
}

export const callGigaChat = async (
  messages: GigaChatMessage[],
  options: Partial<GigaChatRequest> = {}
): Promise<string> => {
  const token = localStorage.getItem('gigachat_token');
  if (!token) throw new Error('GigaChat token not found');

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: 'GigaChat',
      messages,
      stream: false, // REST fallback
      temperature: options.temperature ?? 0.7,
      top_p: options.top_p ?? 0.9,
      max: options.max_tokens ?? 1024,
      ...options    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GigaChat error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
};