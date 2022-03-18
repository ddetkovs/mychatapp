import classNames from 'classnames';
import React, { useContext, useEffect, useRef } from 'react';
import { UserContext } from './App';
import styles from './MessageFeed.module.scss';
import { isMessageSending, Message, Messages, SentMessage } from './useMessages';

const dateTimeFormatter = Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});
const formatTimestamp = (timestamp: number) => dateTimeFormatter.format(new Date(timestamp));


const MessageEntry = ({ message }: { message: Message }) => {
  const userName = useContext(UserContext);
  const isSelf = message.author === userName;
  const isSending = isMessageSending(message);

  return (
    <div
      className={classNames(styles['message-entry'], { [styles['own-message']]: isSelf, [styles.sending]: isSending })}
    >
      {!isSelf && <p className={styles['message-details']}>{message.author}</p>}
      <p className={styles['message-body']}>{message.message}</p>
      <p className={styles['message-details']}>{formatTimestamp(message.timestamp)}</p>
    </div>
  );
};

export const MessageFeed = ({ messages }: { messages: Messages }) => {
  const messageFeedContainer = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messageFeedContainer.current) {
      messageFeedContainer.current.scrollTo({ behavior: 'smooth', top: messageFeedContainer.current.scrollHeight });
    }
  }, [messages]);
  return (
    <div className={styles['message-feed-container']} ref={messageFeedContainer}>
      <div className={styles['message-feed']}>
        {messages.map((message) => (
          <MessageEntry key={message._id} message={message}></MessageEntry>
        ))}
      </div>
    </div>
  );
};
