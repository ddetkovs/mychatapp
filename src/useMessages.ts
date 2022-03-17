import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from './App';
import * as Rest from './rest-api';
import type { RestMessage } from './rest-api';

export type SentMessage = RestMessage & { sending: boolean };
export type Message = RestMessage | SentMessage;

export type Messages = RestMessage[];

const createNewSentMessage = (message: Pick<Message, 'message' | 'author'>): Message => ({
  timestamp: Date.now(),
  _id: Math.random() + '',
  sending: true,
  ...message,
});

export const useMesssages = (pollingInterval = 10000) => {
  var userName = useContext(UserContext);
  const [messages, setMessages] = useState<Messages>([]);

  let timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const poll = async () => {
    const loadedMessages = await Rest.getMessages();
    if (loadedMessages) {
      setMessages(loadedMessages);
    }

    timeout.current = setTimeout(poll, pollingInterval);
  };

  useEffect(() => {
    poll();
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  const sendMessage = async (messageBody: string) => {
    const messageDetails = {
      message: messageBody,
      author: userName,
    };
    const newLocalMessage = createNewSentMessage(messageDetails);
    setMessages((oldMessages) => oldMessages.concat(newLocalMessage));
    const sentMessage = await Rest.sendMessage(messageDetails);
    if (sentMessage) {
      setMessages((oldMessages) =>
        oldMessages.filter((message) => message._id !== newLocalMessage._id).concat(sentMessage)
      );
    } else {
      setMessages((oldMessages) => oldMessages.filter((message) => message._id !== newLocalMessage._id));
    }
  };
  return { messages: messages, sendMessage: sendMessage };
};
