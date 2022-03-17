import React, { useState } from 'react';
import styles from './MessagePrompt.module.scss';
export const MessagePrompt = ({ sendMessage }: { sendMessage: (message: string) => void }) => {
  const [newMessage, setNewMessage] = useState('');
  return (
    <div className={styles['message-prompt-bar-container']}>
      <form onSubmit={() => sendMessage(newMessage)}>
        <input type="text" onChange={(event) => setNewMessage(event.target.value)} />
        <button disabled={newMessage.trim().length === 0}>Send</button>
      </form>
    </div>
  );
};
