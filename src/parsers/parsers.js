const parseMessages = (messagesText) => {
  const lines = messagesText.trim().split("\n");

  const messages = [];

  for (const line of lines) {
    const parts = line.split(": ");

    if (parts.length === 2) {
      const username = parts[0];
      const message = parts[1];
      
      messages.push({ username, message });
    };
  };

  return messages;
};

const parseUsers = (usersText) => {
  const lines = usersText.trim().split("\n");

  const users = {};

  for (const line of lines) {
    const parts = line.split(": ");

    if (parts.length === 2) {
      const username = parts[0];
      const photoPath = parts[1];

      users[username] = photoPath;
    };
  };

  return users;
};

export { parseMessages, parseUsers };