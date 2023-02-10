const fs = require("fs");
const path = require("path");
const JWT = require("../utils/jwt");
const promisePool = require("../db/pool");

const UserController = {
  get: async (ctx, next) => {
    let { pageNum, limitCount } = ctx.query;

    pageNum = pageNum || 1;
    limitCount = limitCount || Infinity;

    const sql = `select s1.id, s1.username, s1.password, s1.age, s1.classes, s1.avatar, s2.chinese, s2.math, s2.english
        from students s1 inner join scores s2 on s1.scores_id=s2.id
        order by s1.classes`;

    try {
      const res = await promisePool.query(
        limitCount == Infinity ? sql : sql + ` limit ? offset ?;`,
        [+limitCount, (pageNum - 1) * +limitCount]
      );

      ctx.body = { code: 1, data: res[0] };
    } catch (error) {
      ctx.body = { code: 0, data: error };
    }
  },
  update: async (ctx, next) => {
    let { filename } = ctx.request.file || {};
    const avatar = filename ? `/uploads/${filename}` : "";
    const { username, password, age, classes } = ctx.request.body;
    const sql = "update students set username=?, password=?, age=?, classes=?";

    try {
      await promisePool.query(
        avatar ? sql + ", avatar=? where id=?" : sql + " where id=?",
        avatar
          ? [username, password, age, classes, avatar, ctx.params.id]
          : [username, password, age, classes, ctx.params.id]
      );

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

    const data = await promisePool.query("select scores_id from students where id=?", [id]);
    const [{ scores_id }] = data[0];

    await promisePool.query('delete from students where id=?', [id])

    await promisePool.query("delete from scores where id=?", [
      scores_id,
    ]);

    if (avatar.includes("uploads")) {
      fs.rm(path.resolve(__dirname, "../public/" + avatar), (err) => {
        console.log(err);
      });
    }
    ctx.body = { code: 1 };
  },
};

module.exports = UserController;
