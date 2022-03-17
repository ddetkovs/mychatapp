import React from 'react';
import styles from './MessagePrompt.module.scss';
export const MessagePrompt = () => {
  return (
    <div className={styles['message-prompt-bar-container']}>
      <form>
        <input type="text" />
        <button>Send</button>
      </form>
    </div>
  );
};
