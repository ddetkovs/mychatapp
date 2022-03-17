import React, { useState } from 'react';
import styles from './MessagePrompt.module.scss';
export const MessagePrompt = ({ sendMessage }: { sendMessage: (message: string) => void }) => {
  const [newMessage, setNewMessage] = useState('');
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    setNewMessage('');
    sendMessage(newMessage);
    event.preventDefault();
  };
  return (
    <div className={styles['message-prompt-bar-container']}>
      <form onSubmit={onFormSubmit}>
        <input
          placeholder="Type a message"
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button disabled={newMessage.trim().length === 0}>Send</button>
      </form>
    </div>
  );
};
