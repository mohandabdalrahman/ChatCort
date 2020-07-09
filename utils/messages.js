const moment = require('moment')
module.exports = (userName, msg) => {
  return {
    userName,
    msg,
    date: moment().format('h:mm a')
  }
}