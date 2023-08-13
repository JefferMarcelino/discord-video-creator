import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

const generateShortVideoWithNotificationSound = async (imagesFolder, notificationSound) => {
  const imageFiles = fs.readdirSync(imagesFolder).filter(file => file.endsWith('.png'));
  const videoPromises = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const imagePath = `${imagesFolder}/${imageFiles[i]}`;
    const outputVideo = `${imagesFolder}/${imageFiles[i].replace(".png", "")}.mp4`;
  
    const videoPromise = new Promise((resolve, reject) => {
      ffmpeg()
        .input(imagePath)
        .inputOption("-framerate 0.5")
        .input(notificationSound)
        .output(outputVideo)
        .videoCodec('libx264')
        .outputOptions('-profile:v', 'main')
        .outputOptions('-pix_fmt', 'yuv420p')
        .audioCodec('aac')
        .outputOptions('-r 30')
        .on('end', () => {
          console.log(`Video generation for ${imageFiles[i]} finished.`);
          resolve(outputVideo);
        })
        .on('error', (err) => {
          console.error(`Error generating video for ${imageFiles[i]}:`, err);
          reject(err);
        })
        .run();
    });

    videoPromises.push(videoPromise);
  }

  const orderedVideos = await Promise.all(videoPromises);

  orderedVideos.sort((a, b) => {
    const aIndex = parseInt(a.match(/(\d+)\.mp4/)[1]);
    const bIndex = parseInt(b.match(/(\d+)\.mp4/)[1]);
    return aIndex - bIndex;
  });

  return orderedVideos;
};

const concatAllVideos = async (videoPaths, outputFolder) => {
  const outputFileName = `${outputFolder}/output.mp4`;

  const ffmpegCommand = ffmpeg();

  videoPaths.forEach((videoPath) => {
    ffmpegCommand.input(videoPath);
  });

  return new Promise((resolve, reject) => {
    ffmpegCommand
      .complexFilter([
        {
          filter: 'concat',
          options: {
            n: videoPaths.length,
            v: 1,
            a: 1,
          },
          inputs: "[0:v] [0:a] [1:v] [1:a] [2:v] [2:a]",
          outputs: ['concatenated_v', 'concatenated_a'],
        },
      ])
      .videoCodec('libx264')
      .outputOptions('-map', '[concatenated_v]', '-map', '[concatenated_a]')
      .outputOptions('-profile:v', 'main')
      .outputOptions('-pix_fmt', 'yuv420p')
      .output(outputFileName)
      .on('end', () => {
        console.log('Concatenation finished');
        resolve(outputFileName);
      })
      .on('error', (err) => {
        console.error('Error:', err);
        reject(err);
      })
      .run();
  });
}

const generateVideo = async (workFolder) => {
  const NOTIFICATION_SOUND = './magic/input/notification.mp3';

  const videoPaths = await generateShortVideoWithNotificationSound(workFolder, NOTIFICATION_SOUND);
  await concatAllVideos(videoPaths, workFolder);
};

export default generateVideo;