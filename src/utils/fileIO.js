import fs from "fs";

const readAndParseFile = (filePath, parseData) => {
  try {
    const file = fs.readFileSync(filePath, "utf-8");
    const data = parseData(file);

    return data;
  } catch (error) {
    console.error("Error reading or parsing the file:", error);

    return [];
  }
};

export default readAndParseFile;