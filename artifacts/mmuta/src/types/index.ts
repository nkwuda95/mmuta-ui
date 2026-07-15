export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserStats {
  level: UserLevel;
  streak: number;
  vocabLearned: number;
  grammarTopics: number;
  lessonsCompleted: number;
  accuracy: number;
}

export interface Vocabulary {
  id: string;
  igbo: string;
  english: string;
  pronunciation: string;
  exampleIgbo: string;
  exampleEnglish: string;
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  examples: Array<{
    igbo: string;
    english: string;
  }>;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'translation';
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: UserLevel;
  vocabulary: Vocabulary[];
  grammar: GrammarRule[];
  quiz: QuizQuestion[];
  isCompleted: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
}
