import { readdir, unlink } from 'fs/promises';
import { join } from 'path';

const folderCleanup = async (folderPath) => {
  try {
    const files = await readdir(folderPath);

    for (const file of files) {
      const filePath = join(folderPath, file);

      if ((file.endsWith('.mp4') && !file.includes("output")) || file.endsWith('.png')) {
        await unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      };
    };

    console.log('Deletion finished.');
  } catch (error) {
    console.error('Error:', error);
  };
};

export default folderCleanup;