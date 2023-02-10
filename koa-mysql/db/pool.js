const mysql2 = require("mysql2");
const config = require("./config");

const promisePool = mysql2.createPool(config).promise();

module.exports = promisePool