import React from 'react';
import styles from './MessageFeed.module.scss';
const Message = ({}) => {
  return (
    <div>
      <p>author</p>
      <p>message</p>
      <p>details</p>
    </div>
  );
};

export const MessageFeed = () => {
  return (
    <div className={styles['message-feed-container']}>
      <Message></Message>
      <Message></Message>
      <Message></Message>
      <Message></Message>
    </div>
  );
};
