const config = {
  host: "localhost",
  port: 3306,
  user: "jelly",
  password: "jelly",
  database: "jelly_project",
  // 一个连接池，一个线程
  connectionLimit: 1,
};

module.exports = config
