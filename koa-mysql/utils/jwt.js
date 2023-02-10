const jwt = require("jsonwebtoken");

const secret = "jelly-world";

const JWT = {
  generate(value, expires) {
    // 返回 token 字符串
    return jwt.sign(value, secret, {
      expiresIn: expires,
    });
  },
  verify(token) {
    try {
      // 成功 返回解密后的数据
      return jwt.verify(token, secret);
    } catch (error) {
      return false;
    }
  },
};

module.exports = JWT;
