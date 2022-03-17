export type RestMessage = {
  _id: string;
  message: string;
  author: string;
  timestamp: number;
};

const apiToken = process.env.REACT_APP_API_TOKEN;

const ENDPOINT_URL = `https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0`;

const handleError = (error: unknown) => {
};

export const getMessages = async () => {
  try {
    if (!apiToken) {
      throw Error('API token is incorrect');
    }
    const response = await fetch(`${ENDPOINT_URL}/?token=${apiToken}`);
    const messages = (await response.json()) as RestMessage[];
    return messages;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '';
    alert('Could not load messages. ' + errorMessage);
  }
};

export const sendMessage = async (message: Pick<RestMessage, 'message' | 'author'>) => {
  try {
    if (!apiToken) {
      throw Error('API token is incorrect');
    }
    const response = await fetch(ENDPOINT_URL, {
      headers: {
        'Content-Type': 'application/json',
        token: apiToken,
      },
      method: 'POST',
      body: JSON.stringify(message),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '';
    alert('Could not send message. ' + errorMessage);
  }
};
