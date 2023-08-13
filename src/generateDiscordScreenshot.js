import fs from "fs";
import { createCanvas, loadImage } from "canvas";

const generateDiscordScreenshot = async (key, userphoto, username, date, message) => {
  const TEXT_X = 235;
  const USERNAME_FONTSIZE = 36;
  const MESSAGE_FONTSIZE = 28;
  const DATE_FONTSIZE = 32;
  
  // Dimensions for the image
  const width = 1200;
  const height = 155;

  // Instantiate the canvas object
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Fill the rectangle with purple
  context.fillStyle = "#323339";
  context.fillRect(0, 0, width, height);


  // Load the user photo image
  const image = await loadImage(userphoto);

  // Draw the user photo image clipped to a circle
  context.save(); // Save the current canvas state
  context.beginPath();
  context.arc(60 + 65, 76, 65, 0, Math.PI * 2); // Create a circular path
  context.closePath();
  context.clip(); // Clip to the circular path
  context.drawImage(image, 60, 10, 130, 130); // Draw the image within the circular clip
  context.restore(); // Restore the canvas state

  // Draw the username at the right position
  const usernameY = 20 + USERNAME_FONTSIZE;
  context.font = `${USERNAME_FONTSIZE}px 'PT Sans'`;
  context.fillStyle = "#F2F3F5";
  context.fillText(username, TEXT_X, usernameY);

  const totalUsernameWidth = context.measureText(username).width;

  // Draw the message at the right position
  const messageY = usernameY + MESSAGE_FONTSIZE + 20;
  context.font = `${MESSAGE_FONTSIZE}px 'PT Sans'`;
  context.fillStyle = "#DBDEE1";
  context.fillText(message, TEXT_X, messageY); // The 2 is a random value to align the message with the username

  // Draw the date at the side of the username
  const dateY = usernameY;
  const dateX = TEXT_X + totalUsernameWidth + 20; // Adjust the value for spacing
  context.font = `${DATE_FONTSIZE}px 'PT Sans'`;
  context.fillStyle = "#808080";
  context.fillText(date, dateX, dateY);

  // Write the image to file
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`./magic/screenshots/${key}.png`, buffer);
};

export default generateDiscordScreenshot;