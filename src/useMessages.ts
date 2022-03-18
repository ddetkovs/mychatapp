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

export const isMessageSending = (message: Message): message is SentMessage => {
  return (message as SentMessage).sending === true;
};
export const useMesssages = (pollingInterval = 1000) => {
  var userName = useContext(UserContext);
  const [messages, setMessages] = useState<Messages>([]);

  let timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  let lastMessageTimestamp = useRef(0);

  const poll = async () => {
    const loadedMessages = await Rest.getMessages(lastMessageTimestamp.current);
    if (loadedMessages) {
      setMessages((oldMessages) => {
        var loadedIds = new Set(loadedMessages.map(message => message._id));
        oldMessages = oldMessages.filter((message) => !loadedIds.has(message._id));
        return oldMessages.concat(loadedMessages).sort((a, b) => a.timestamp - b.timestamp);
      });

      const lastMessage = loadedMessages.filter((message) => !isMessageSending(message)).at(-1);
      if (lastMessage) {
        lastMessageTimestamp.current = lastMessage.timestamp;
      }
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
      // remove the temporary message
      setMessages((oldMessages) => oldMessages.filter((message) => message._id !== newLocalMessage._id));
    }
  };
  return { messages: messages, sendMessage: sendMessage };
};
