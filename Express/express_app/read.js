const fs = require("fs");
const path = require("path");

const readFileData = () => {
  const filePath = path.join(__dirname, "Data.txt");

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject("Error reading Data.txt file");
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = readFileData;
