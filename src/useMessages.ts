import { useContext, useEffect, useState } from 'react';
import { UserContext } from './App';
import { getMessages, RestMessage } from './rest-api';

export type SentMessage = RestMessage & { sending: boolean };
export type Message = RestMessage | SentMessage;

export type Messages = RestMessage[];

const createDummyMessage = (message: Partial<RestMessage>): RestMessage => ({
  timestamp: Date.now(),
  author: 'Me',
  message: 'message',
  _id: Math.random() + '',
  ...message,
});

export const useMesssages = (pollingInterval = 10000) => {
  var userName = useContext(UserContext);
  const [messages, setMessages] = useState<Messages>([]);

  let currentTimeout: ReturnType<typeof setTimeout>;

  const poll = async () => {
    const loadedMessages = await getMessages();
    if (loadedMessages) {
      setMessages(loadedMessages);
    }

    currentTimeout = setTimeout(poll, pollingInterval);
  };

  useEffect(() => {
    poll();
    return () => {
      clearTimeout(currentTimeout);
    };
  });

  const sendMessage = (messageBody: string) => {
    setMessages((oldMessages) => oldMessages.concat([createDummyMessage({ author: userName, message: messageBody })]));
  };
  return { messages: messages, sendMessage: sendMessage };
};
