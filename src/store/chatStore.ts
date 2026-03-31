import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  isLoading: boolean;
  error: string | null;

  setActiveChat: (id: string | null) => void;
  createChat: (initialMessage?: string) => void;
  updateChatTitle: (id: string, title: string) => void;
  deleteChat: (id: string) => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'> => void;
  updateLastMessage: (chatId: string, content: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,
      isLoading: false,
      error: null,

      setActiveChat: (id) => set({ activeChatId: id }),

      createChat: (initialMessage) => {
        const id = Date.now().toString();
        const title = initialMessage
          ? initialMessage.length > 40
            ? initialMessage.slice(0, 37) + '...'
            : initialMessage
          : `Новый чат ${get().chats.length + 1}`;

        const newChat: Chat = {
          id,
          title,
          messages: initialMessage
            ? [
                {
                  id: 'msg-' + Date.now(),
                  role: 'user',
                  content: initialMessage,
                  timestamp: new Date(),
                },
              ]
            : [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          chats: [...state.chats, newChat],
          activeChatId: id,
        }));
      },

      updateChatTitle: (id, title) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === id ? { ...c, title, updatedAt: new Date() } : c
          ),
        })),

      deleteChat: (id) => {
        set((state) => {
          const chats = state.chats.filter((c) => c.id !== id);
          let newActiveId = state.activeChatId;
          if (newActiveId === id) {
            newActiveId = chats.length > 0 ? chats[0].id : null;
          }
          return { chats, activeChatId: newActiveId };
        });
      },

      addMessage: (chatId, message) =>
        set((state) => {
          const chat = state.chats.find((c) => c.id === chatId);
          if (!chat) return;
          const newMsg: Message = {
            ...message,
            id: 'msg-' +.now(),
            timestamp: new Date(),
          };
          return {
            chats: state.chats.map((c) =>
              c.id === chatId
                ? {
                    ...c,
                    messages: [...c.messages, newMsg],
                    updatedAt: new Date(),
                  }
                : c
            ),
          };
        }),

      updateLastMessage: (chatId, content) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId && c.messages.length > 0
              ? {
                  ...c,
                  messages: c.messages.map((m, i) =>
                    i === c.messages.length - 1
                      ? { ...m, content }
                      : m
                  ),
                }
              : c
          ),
        })),

      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);