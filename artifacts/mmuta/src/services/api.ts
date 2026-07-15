import { ChatMessage, Lesson } from '../types';

interface ChatResponse {
  message: ChatMessage;
}

interface LearnerProgress {
  level: string;
  currentLessonId: string;
  masteredVocabulary: string[];
  grammarLearned: string[];
  recurringMistakes: string[];
  completedLessonIds: string[];
}

// Set in .env as VITE_API_BASE_URL. Falls back to the FastAPI dev default
// (`uvicorn server:app` with no --port serves on 8000).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`${options?.method ?? 'GET'} ${path} failed: ${response.status}`);
  }

  return response.json();
}

export const mmutaApi = {
  // conversationId kept in the signature so tutor.tsx doesn't need to
  // change, but it isn't sent anywhere yet — the backend tracks one
  // ongoing tutoring context per learner, not separate named
  // conversations. Conversation history in the sidebar is still
  // client-side only (see store/index.ts) and won't survive a refresh.
  async sendChatMessage(content: string, _conversationId?: string): Promise<ChatResponse> {
    const data = await apiFetch<{ message: string }>('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: content }),
    });

    return {
      message: {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString(),
      },
    };
  },

  async getLessons(): Promise<Lesson[]> {
    return apiFetch<Lesson[]>('/api/lessons');
  },

  async getLesson(id: string): Promise<Lesson | undefined> {
    try {
      return await apiFetch<Lesson>(`/api/lessons/${id}`);
    } catch {
      return undefined;
    }
  },

  // New — not in the original mock API. Call this once a learner
  // finishes a lesson's quiz; the backend marks the lesson complete and
  // its vocab/grammar as learned.
  async completeLesson(id: string): Promise<Lesson> {
    return apiFetch<Lesson>(`/api/lessons/${id}/complete`, { method: 'POST' });
  },

  // New — real tracked progress, to replace the mocked UserStats in
  // store/index.ts. Note this has no `streak` or `accuracy` field: the
  // backend doesn't track daily activity or answer accuracy over time,
  // so those two stay mocked in the dashboard/progress pages for now.
  async getLearnerProgress(): Promise<LearnerProgress> {
    return apiFetch<LearnerProgress>('/api/learner');
  },
};