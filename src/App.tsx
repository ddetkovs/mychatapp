import React from 'react';
import AppStyles from './App.module.scss';
import { MessageFeed } from './MessageFeed';
import { MessagePrompt } from './MessagePrompt';
import { useMesssages } from './useMessages';

const userName = 'Me' || prompt(`What's your name?`) || 'Jimbo';
export const UserContext = React.createContext<string>(userName);

function App() {
  const { messages, sendMessage } = useMesssages();
  return (
    <UserContext.Provider value={userName}>
      <div className={AppStyles['my-chat-app']}>
        <MessageFeed messages={messages}></MessageFeed>
        <MessagePrompt sendMessage={sendMessage}></MessagePrompt>
      </div>
    </UserContext.Provider>
  );
}

export default App;
