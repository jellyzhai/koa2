const fs = require("fs");
const path = require("path");
const JWT = require("../utils/jwt");
const UserService = require("../services/userService");

const UserController = {
  get: async (ctx, next) => {
    let { pageNum, limitCount } = ctx.query;

    pageNum = pageNum || 1;
    limitCount = limitCount || Infinity;

    try {
      let data = await UserService.get(pageNum, limitCount);
      data = [...data].map((item) => ({ ...item._doc, id: item._doc._id }));

      ctx.body = { code: 1, data };
    } catch (error) {
      ctx.body = { code: 0, data: error };
    }
  },
  update: async (ctx, next) => {
    let { filename } = ctx.request.file || {};
    const avatar = filename ? `/uploads/${filename}` : "";

    const { id } = ctx.params;
    const { username, password, age } = ctx.request.body;
    const updatedData = avatar
      ? { username, password, age, avatar }
      : { username, password, age };

    try {
      const data = await UserService.update(id, updatedData);

      ctx.body = { code: 1 };
    } catch (error) {
      if (avatar) {
        fs.rm(path.resolve(__dirname, "../public/" + avatar), (err) => {
          console.log(err);
        });
      }
      ctx.body = { code: 0, data: error };
    }
  },
  delete: async (ctx, next) => {
    const { id } = ctx.params;
    const { avatar } = ctx.query;

    try {
      await UserService.delete(id);

      if (avatar.includes("uploads")) {
        fs.rm(path.resolve(__dirname, "../public/" + avatar), (err) => {
          console.log(err);
        });
      }
      ctx.body = { code: 1 };
    } catch (error) {
      ctx.body = { code: 0, date: error };
    }
  },
};

module.exports = UserController;
