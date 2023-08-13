import fs from "fs";
import { createCanvas, loadImage } from "canvas";

const generateDiscordScreenshot = async (key, userphoto, username, date, message) => {
  const TEXT_X = 235;
  const USERNAME_FONTSIZE = 36;
  const MESSAGE_FONTSIZE = 32;
  const DATE_FONTSIZE = 32;
  
  // Dimensions for the image
  const width = 1200;
  const height = 720; 

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  
  context.fillStyle = "#323339";
  context.fillRect(0, (height / 2) - 100, width, (height / 2) - 180);
  
  // Draw userphoto
  const image = await loadImage(userphoto);
  context.save();
  context.beginPath();
  context.arc(50 + 75, height / 2 - 10, 75, 0, Math.PI * 2);
  context.closePath();
  context.clip();
  context.drawImage(image, 50, height / 2 - 85, 150, 150); 
  context.restore();

  // Draw username
  const usernameY = ((height / 2) + 20) - USERNAME_FONTSIZE - 20;
  context.font = `${USERNAME_FONTSIZE}px 'PT Sans'`;
  context.fillStyle = "#F2F3F5";
  context.fillText(username, TEXT_X, usernameY);

  const totalUsernameWidth = context.measureText(username).width;

  // Draw message
  const messageY = usernameY + USERNAME_FONTSIZE + 20;
  context.font = `${MESSAGE_FONTSIZE}px 'PT Sans'`;
  context.fillStyle = "#DBDEE1";
  context.fillText(message, TEXT_X, messageY);

  // Draw date
  const dateY = usernameY;
  const dateX = TEXT_X + totalUsernameWidth + 20;
  context.font = `${DATE_FONTSIZE}px 'PT Sans'`;
  context.fillStyle = "#808080";
  context.fillText(date, dateX, dateY);

  // Write the image to file
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`./magic/output/${key}.png`, buffer);
};


export default generateDiscordScreenshot;