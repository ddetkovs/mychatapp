import classNames from 'classnames';
import React from 'react';
import styles from './MessageFeed.module.scss';

type Message = {
  _id: string;
  message: string;
  author: string;
  timestamp: number;
};

type Messages = Message[];

const messages: Messages = [
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

const MessageEntry = ({ message }: { message: Message }) => {
  const isSelf = message.author === 'Me';

  return (
    <div className={classNames(styles['message-entry'], { [styles['own-message']]: isSelf })}>
      <p>{message.author}</p>
      <p>{message.message}</p>
      <p>{message.timestamp}</p>
    </div>
  );
};

export const MessageFeed = () => {
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
