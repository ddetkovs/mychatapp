import React from 'react';
import AppStyles from './App.module.scss';
import { MessageFeed } from './MessageFeed';
import { MessagePrompt } from './MessagePrompt';

const userName = 'Me' || prompt(`What's your name?`) || 'Jimbo';
export const UserContext = React.createContext<string>(userName);

function App() {
  return (
    <UserContext.Provider value={userName}>
      <div className={AppStyles['my-chat-app']}>
        <MessageFeed></MessageFeed>
        <MessagePrompt></MessagePrompt>
      </div>
    </UserContext.Provider>
  );
}

export default App;
