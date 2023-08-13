import readAndParseFile from "./utils/fileIO.js";
import { parseMessages, parseUsers } from "./parsers/parsers.js";
import generateDate from "./generators/generateDate.js";
import formatDigits from "./utils/formatNumber.js";
import generateDiscordScreenshot from "./generators/generateDiscordScreenshot.js";
import generateVideo from "./generators/generateVideo.js";
import folderCleanup from "./utils/folderCleanup.js";

const main = async () => {
  const messages = readAndParseFile("./magic/input/messages.txt", parseMessages);
  const users = readAndParseFile("./magic/input/users.txt", parseUsers);

  const { hour, minutes } = generateDate();

  const screenshotPromises = messages.map(async (message, i) => {
    const formattedMinutes = formatDigits(Math.floor((0.3 * i) + minutes), 2);

    await generateDiscordScreenshot(
      i, 
      users[message.username], 
      message.username,
      `Hoje as ${hour}:${formattedMinutes}`,
      message.message
    );

    console.log(`Image ${i} generated.`);
  });

  await Promise.all(screenshotPromises);
  await generateVideo("./magic/output");
  await folderCleanup("./magic/output");
  
  console.log("Your video is ready!!!");
};

main();