import { useContext, useState } from 'react';
import { UserContext } from './App';

export type Message = {
  _id: string;
  message: string;
  author: string;
  timestamp: number;
};

export type Messages = Message[];

const dummyMessages: Messages = [
  {
    _id: '61b046a648c220001b5f6c7f',
    message: 'Hello world',
    author: 'Tom',
    timestamp: 1638942374690,
  },
  {
    _id: '61b04b3148c220001b5f6c80',
    message: 'Test message',
    author: 'RandomUser',
    timestamp: 1638943537253,
  },
  {
    _id: '61b05ae748c220001b5f6c81',
    message: 'Messages are tested',
    author: 'Me',
    timestamp: 1638947559815,
  },
];
const createDummyMessage = (message: Partial<Message>): Message => ({
  timestamp: Date.now(),
  author: 'Me',
  message: 'message',
  _id: Math.random() + '',
  ...message,
});

export const useMesssages = () => {
  var userName = useContext(UserContext);
  const [messages, setMessages] = useState<Messages>(dummyMessages);

  const sendMessage = (messageBody: string) => {
    setMessages((oldMessages) => oldMessages.concat([createDummyMessage({ author: userName, message: messageBody })]));
  };
  return { messages: messages, sendMessage: sendMessage };
};
