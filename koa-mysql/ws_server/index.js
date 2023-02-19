// 服务端 和 客户端api： https://socket.io/docs/v4/server-api
function startSocketIoServer(app) {
  const server = require("http").createServer(app.callback());
  const io = require("socket.io")(server);
  const JWT = require("../utils/jwt");

  const serverName = "server";
  const groupChat = "groupChat";
  const notAuthorize = "401";

  function createMsg(fromUser, toUser, data) {
    return {
      fromUser,
      toUser,
      data,
    };
  }

  function sendGroupMessage(data, socket) {
    if (data.fromUser == serverName) {
      // 给所有 客户端 socket 发送事件
      io.sockets.emit("groupMessage", data);
    } else {
      // 给除了自己之外的 客户端 socket 发送事件
      socket.broadcast.emit("groupMessage", data);
    }
  }

  function sendListMessageToAll(data) {
    io.sockets.emit("listMessage", data);
  }

  function sendSingle(fromUser, toUser, data) {
    const targetSocket = [...io.sockets.sockets.values()].find(
      (socket) => socket.username == toUser
    );

    if (targetSocket) {
      targetSocket.emit("singleMessage", { fromUser, toUser, data });
    }
  }

  io.on("connection", (socket) => {
    const token = socket.handshake.query.token;
    const userInfo = JWT.verify(token);

    if (!userInfo) {
      // 第一个参数必须是 type string or instance of Buffer, ArrayBuffer, Array, Array-like Object.
      socket.emit(
        notAuthorize,
        createMsg(serverName, null, "token 无效或已过期！")
      );
      socket.disconnect();
      return;
    }

    socket.username = userInfo.username;

    function getAllSockets() {
      return [...io.sockets.sockets.values()];
    }

    function getCurrentUserList() {
      const allSockets = getAllSockets();

      return allSockets.map((socket) => socket.username);
    }

    sendGroupMessage(
      createMsg(serverName, groupChat, `欢迎 ${socket.username} 来到聊天室`),
      socket
    );

    sendListMessageToAll(createMsg(serverName, null, getCurrentUserList()));

    socket.on("disconnect", () => {
      sendListMessageToAll(createMsg(serverName, null, getCurrentUserList()));
    });

    socket.on("singleMessage", ({ toUser, data }) => {
      sendSingle(socket.username, toUser, data);
    });

    socket.on("groupMessage", ({ toUser, data }) => {
      sendGroupMessage({ fromUser: socket.username, toUser, data }, socket);
    });

    console.log("已连接");
  });
  server.listen(3000, () => {
    console.log("socket.io 服务器启动成功：http://127.0.0.1:3000");
  });
}

module.exports = startSocketIoServer;
