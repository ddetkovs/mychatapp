import classNames from 'classnames';
import React, { useContext } from 'react';
import { UserContext } from './App';
import styles from './MessageFeed.module.scss';
import { Message, Messages } from './useMessages';



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

  return (
    <div className={classNames(styles['message-entry'], { [styles['own-message']]: isSelf })}>
      {!isSelf && <p className={styles['message-details']}>{message.author}</p>}
      <p className={styles['message-body']}>{message.message}</p>
      <p className={styles['message-details']}>{formatTimestamp(message.timestamp)}</p>
    </div>
  );
};

export const MessageFeed = ({ messages }: { messages: Messages }) => {
  return (
    <div className={styles['message-feed-container']}>
      <div className={styles['message-feed']}>
        {messages.map((message) => (
          <MessageEntry key={message._id} message={message}></MessageEntry>
        ))}
      </div>
    </div>
  );
};
