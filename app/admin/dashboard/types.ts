export type Contact = {
  _id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  goal?: string;
  createdAt?: string;
};

export type AskedQuestion = {
  question: string;
  count: number;
  percentage: number;
  date?: string;
  time?: string;
};

export type ContactDashboardResponse = {
  success: boolean;
  message?: string;
  data?: {
    totalForms: number;
    last24Hours: {
      count: number;
      from: string;
      to: string;
    };
    recentForms: Contact[];
  };
};

export type AskedQuestionsResponse = {
  success: boolean;
  message?: string;
  data?: {
    totalQuestions: number;
    questions: AskedQuestion[];
  };
};