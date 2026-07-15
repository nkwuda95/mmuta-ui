import { Conversation, Lesson, UserStats, Vocabulary } from '../types';

export const mockUserStats: UserStats = {
  level: 'beginner',
  streak: 12,
  vocabLearned: 145,
  grammarTopics: 8,
  lessonsCompleted: 15,
  accuracy: 88,
};

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Greetings & Introductions',
    description: 'Learn how to greet people and introduce yourself in Igbo.',
    level: 'beginner',
    isCompleted: true,
    vocabulary: [
      {
        id: 'v1',
        igbo: 'Nnọọ',
        english: 'Welcome',
        pronunciation: 'n-naw-aw',
        exampleIgbo: 'Nnọọ n\'ụlọ m.',
        exampleEnglish: 'Welcome to my house.',
      },
      {
        id: 'v2',
        igbo: 'Kedu',
        english: 'How are you?',
        pronunciation: 'keh-doo',
        exampleIgbo: 'Kedu ka ị mere?',
        exampleEnglish: 'How are you doing?',
      },
      {
        id: 'v3',
        igbo: 'Ọ dị mma',
        english: 'It is good / I am fine',
        pronunciation: 'aw dee m-mah',
        exampleIgbo: 'Ahụ dị mma.',
        exampleEnglish: 'My body is good (I am fine).',
      },
    ],
    grammar: [
      {
        id: 'g1',
        title: 'Subject Pronouns (I, You, He/She)',
        explanation: 'In Igbo, pronouns change depending on whether they are singular or plural. "M" or "mụ" means I/me, "ị" or "gị" means you.',
        examples: [
          { igbo: 'M na-abịa', english: 'I am coming' },
          { igbo: 'Ị na-abịa', english: 'You are coming' },
        ],
      }
    ],
    quiz: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'How do you say "Welcome" in Igbo?',
        options: ['Kedu', 'Nnọọ', 'Dalu', 'Biko'],
        correctAnswer: 'Nnọọ',
      },
      {
        id: 'q2',
        type: 'translation',
        question: 'Translate: "Kedu ka ị mere?"',
        correctAnswer: 'How are you doing?',
      }
    ],
  },
  {
    id: 'lesson-2',
    title: 'Family Members',
    description: 'Learn the names for different family members.',
    level: 'beginner',
    isCompleted: false,
    vocabulary: [
      {
        id: 'v4',
        igbo: 'Nne',
        english: 'Mother',
        pronunciation: 'n-neh',
        exampleIgbo: 'Nne m dị mma.',
        exampleEnglish: 'My mother is good.',
      },
      {
        id: 'v5',
        igbo: 'Nna',
        english: 'Father',
        pronunciation: 'n-nah',
        exampleIgbo: 'Nna m na-arụ ọrụ.',
        exampleEnglish: 'My father is working.',
      },
    ],
    grammar: [
      {
        id: 'g2',
        title: 'Possessive Pronouns (My, Your)',
        explanation: 'In Igbo, possessives come after the noun. "m" means my, "gị" means your.',
        examples: [
          { igbo: 'Nne m', english: 'My mother' },
          { igbo: 'Ụlọ gị', english: 'Your house' },
        ],
      }
    ],
    quiz: [
      {
        id: 'q3',
        type: 'multiple_choice',
        question: 'What is the Igbo word for "Father"?',
        options: ['Nne', 'Nwanna', 'Nna', 'Nwa'],
        correctAnswer: 'Nna',
      }
    ]
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Practicing Greetings',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Nnọọ',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: 'm2',
        role: 'assistant',
        content: 'Nnọọ! Kedu ka ị mere taa? (Welcome! How are you doing today?)',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23.9).toISOString(),
      },
      {
        id: 'm3',
        role: 'user',
        content: 'Ọ dị mma, kedu maka gị?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23.8).toISOString(),
      },
      {
        id: 'm4',
        role: 'assistant',
        content: 'Ahụ dịkwa m mma, dalu. (I am fine too, thank you.) Excellent job using "kedu maka gị" (how about you)! Would you like to practice asking for my name?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23.7).toISOString(),
      }
    ]
  }
];

export const mockChartData = [
  { name: 'Mon', words: 5, grammar: 1 },
  { name: 'Tue', words: 12, grammar: 2 },
  { name: 'Wed', words: 8, grammar: 0 },
  { name: 'Thu', words: 15, grammar: 3 },
  { name: 'Fri', words: 20, grammar: 1 },
  { name: 'Sat', words: 25, grammar: 4 },
  { name: 'Sun', words: 30, grammar: 2 },
];
