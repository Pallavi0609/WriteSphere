
export type HistoryItem = {
  id: string;
  topic: string;
  type: "Outline" | "Draft" | "Grammar Check" | "Style Improvement";
  language: string;
  date: string;
};

export type DraftHistory = {
  id: string;
  userId: string;
  topic: string;
  content: string;
  language: string;
  type: "Outline" | "Draft" | "Grammar Check" | "Style Improvement" | "Playground";
  createdAt: any;
  updatedAt: any;
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  preferredLanguage: string;
  preferredTone: string;
  createdAt: any;
  updatedAt: any;
};
