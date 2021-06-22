const fs = require('fs');
const readline = require('readline');

// load your test here
/** 
 *@example 
  const list = [
  {
    Key: 'Home',
    zh_CN: '首页',
    en_US: 'Home',
  },
  {
    Key: 'Developer Docs',
    zh_CN: '开发者文档',
    en_US: 'Developer Docs',
  },
  */
const list = require('./list');

const genJson = async (language) => {
  const json = {};
  list.map((item) => {
    json[item.Key] = item[language];
  });

  const writingString = JSON.stringify(json);

  try {
    fs.open(`./${language}.json`, 'a', (err, fd) => {
      if (!err) {
        console.log(fd);
        fs.write(fd, writingString, (err, res) => {
          if (!err) {
            fs.close(fd);
            return 1;
          }
          throw err;
        });
      }
    });
  } catch (e) {
    throw e;
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Which language template do you want generate ', async (lang) => {
  // TODO: Log the answer in a database
  try {
    console.log(`start generate ${lang} template`);
    await genJson(lang);
    console.log(`generate ${lang} template success`);
  } catch (e) {
    console.log(`generate ${lang} template faid`);
  } finally {
    rl.close();
  }
});
