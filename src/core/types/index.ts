import { Dayjs } from "dayjs";

export type Role = 'assistant' | 'user';

export type Message = {
  id: string;
  sendAt: Dayjs;
  content: string;
  role: Role;
};

export type ChatCompletionRequestMessage = {
  'role': Role | 'assistant';
  'content': string;
  'name'?: string;
}

export type CreateChatCompletionRequest = {
  'model': string;
  'messages': Array<ChatCompletionRequestMessage>;
  'temperature'?: number | null;
  'top_p'?: number | null;
  'n'?: number | null;
  'stream'?: boolean | null;
  'max_tokens'?: number;
  'presence_penalty'?: number | null;
  'frequency_penalty'?: number | null;
  'logit_bias'?: object | null;
  'user'?: string;
}

export type UserData = {
  userClass: string | null;
  userTeam: string | null;
  botID: string | null;
  botName: string | null;
  topicID: string | null;
}

export type AsyncAction = (content: string, userData: UserData) => Promise<void>;  // 비동기 액션의 타입 정의

export type ChattingStoreType = {
  messages: Message[];
  fingerprint: string;
  isWaiting: boolean;
  hasError: boolean;
  actions: {
    pushUserMessage: AsyncAction;
    fixWelcomeMessage: AsyncAction;
    updateAssistantMessage: (content: string, userData: UserData) => void;
    setError: () => void;
    setFingerprint: (fingerprint: string) => void;
    addMessage: (message: Message) => void;
  };
};

export interface InputProps {
  userData: UserData | null;
}

export interface BodyProps {
  userData: UserData | null;
}

export interface ProviderDetail {
  // Assuming each provider has a name and an id as an example,
  // adjust the properties to match the actual shape of your provider objects
  name: string;
  id: string;
}
