import { readFile, writeFile } from 'fs';

const DATABASE_URL = 'data.json';

export const read = (callback) => {
  const handleFileRead = (err, data) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }
    const jsonObj = JSON.parse(data);
    callback(null, jsonObj);
  };

  readFile(DATABASE_URL, 'utf-8', handleFileRead);
};

export const write = (jsonObj, callback) => {
  const jsonStr = JSON.stringify(jsonObj);
  writeFile(DATABASE_URL, jsonStr, (err) => {
    if (err) {
      callback(err, null);
    }

    callback(null, jsonStr);
  });
};

export const edit = (readCallback, writeCallback) => {
  read((err, jsonObj) => {
    if (err) {
      readCallback(err, null);
      return;
    }

    readCallback(null, jsonObj);

    write(jsonObj, writeCallback);
  });
};

export const add = (key, input, callback) => {
  const readCallback = (err, jsonObj) => {
    if (err) {
      console.error('error');
      callback(err);
      return;
    }

    if (!(key in jsonObj)) {
      callback('key does not exist');
      return;
    }

    jsonObj[key].push(input);
  };

  edit(readCallback, callback);
};
