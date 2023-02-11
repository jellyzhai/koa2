const UserModel = require("../model/model");

const UserService = {
  add: (username, password, age, avatar) => {
    // UserModel 集合的方法 create find update delete, 返回promise
    return UserModel.create({ username, password, age, avatar });
  },
  get: (pageNum, limitCount) => {
    return UserModel.find({}, ["id", "username", "age", "password", "avatar"])
      .skip((pageNum - 1) * limitCount)
      .limit(limitCount)
      .sort({ age: 1 });
  },
  // updatedData: { username, password, age, avatar? }
  update: (id, updatedData) => {
    return UserModel.updateOne({ _id: id }, { $set: updatedData });
  },
  delete: (id) => {
    return UserModel.deleteOne({ _id: id });
  },
};

module.exports = UserService;
