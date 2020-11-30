const fs = require('fs-extra');

async function writeJson (jsonPath, jsonContent) {
    try {
      await fs.writeJson(jsonPath, jsonContent)
    } catch (err) {
      throw err;
    }
}

async function readJson (jsonPath) {
    try {
      const content = await fs.readJson(jsonPath, 'utf8');
      return content;
    } catch (err) {
      throw err;
    }
}

async function ensureDir (dirPath) {
    try {
      await fs.ensureDir(dirPath);
    } catch (err) {
      throw err;
    }
  }

module.exports = {
    writeJson,
    readJson,
    ensureDir
}