const fs = require('fs-extra')
const moment = require('moment')
const util = require('util')

const log = async  (message, data, folder) => {
  try {

    const date = moment().format('YYYY-MM-DD')    
    const filePath = `./storage/logs/${folder}/${date}.log`;
    
    await fs.ensureFile(filePath)

    const logger = await fs.createWriteStream(filePath, {
      flags: 'a'
    })

    
    const timestamp = moment().format();
    await logger.write(`\n ${timestamp} ${message}`);

    await logger.write(`\n ${timestamp} ${util.inspect(data)}`);

    // logger.end()
  } catch (err) {
    console.log('Logger Failed', err)

    console.log('data to be logged', data)
  }

}

module.exports = { log }