export type AIChat = {
  id: string;
  guestSessionId: string;
  message: string;
  date: string;
  time: string;
  createdAt: string;
};

export type ChatPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type AIChatsResponse = {
  success: boolean;
  message?: string;
  data?: {
    chats: AIChat[];
    pagination: ChatPagination;
  };
};