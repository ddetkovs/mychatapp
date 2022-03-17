import React from 'react';
import AppStyles from './App.module.scss';
import { MessageFeed } from './MessageFeed';
import { MessagePrompt } from './MessagePrompt';

function App() {
  return (
    <div className={AppStyles['my-chat-app']}>
      <MessageFeed></MessageFeed>
      <MessagePrompt></MessagePrompt>
    </div>
  );
}

export default App;
