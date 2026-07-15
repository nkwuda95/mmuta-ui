import { create } from 'zustand';
import { Conversation, UserStats } from '../types';
import { mockConversations, mockUserStats } from '../mock/data';

interface AppState {
  stats: UserStats;
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  addMessageToActiveConversation: (message: any) => void;
  createNewConversation: () => string;
  updateStats: (newStats: Partial<UserStats>) => void;
}

export const useStore = create<AppState>((set, get) => ({
  stats: mockUserStats,
  conversations: mockConversations,
  activeConversationId: mockConversations.length > 0 ? mockConversations[0].id : null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  addMessageToActiveConversation: (message) => {
    set((state) => {
      const { activeConversationId, conversations } = state;
      if (!activeConversationId) return state;

      return {
        conversations: conversations.map(c => {
          if (c.id === activeConversationId) {
            return {
              ...c,
              messages: [...c.messages, message],
              updatedAt: new Date().toISOString(),
            };
          }
          return c;
        })
      };
    });
  },
  createNewConversation: () => {
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: 'New Conversation',
      messages: [],
      updatedAt: new Date().toISOString(),
    };
    
    set((state) => ({
      conversations: [newConv, ...state.conversations],
      activeConversationId: newId,
    }));
    
    return newId;
  },
  updateStats: (newStats) => set((state) => ({ stats: { ...state.stats, ...newStats } })),
}));
