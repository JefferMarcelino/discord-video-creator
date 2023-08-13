import generateDiscordScreenshot from "./generateDiscordScreenshot.js";
import fs from "fs";
import generateDiscordVideo from "./generateVideo.js";
import cleanOutput from "./cleanOutput.js";

const parseMessages = (messagesData) => {
  const lines = messagesData.trim().split("\n");

  const messages = [];
  let currentUser = null;

  for (const line of lines) {
    const parts = line.split(": ");
    if (parts.length === 2) {
      const username = parts[0];
      const message = parts[1];
      
      if (currentUser === null || currentUser !== username) {
        messages.push({ username, message });
        currentUser = username;
      }
    }
  }

  return messages;
};

const parseUsers = (usersData) => {
  const lines = usersData.trim().split("\n");

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

const readAndParseFile = (filePath, parseData) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const messages = parseData(data);
    return messages;
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    return [];
  }
};

const main = async () => {
  const messages = readAndParseFile("./magic/input/messages.txt", parseMessages);
  const users = readAndParseFile("./magic/input/users.txt", parseUsers);
  
  for(let i = 0; i < messages.length; i++) {
    await generateDiscordScreenshot(
      i, 
      users[messages[i].username], 
      messages[i].username, 
      "Today at 2:03PM",
      messages[i].message
    );
  
    console.log(`Image with key ${i} generated!`);
  };
  
  await generateDiscordVideo("./magic/output");
  
  await cleanOutput();

  console.log("Your video is ready!!!");
};

main();