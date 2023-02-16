// 需要安装服务端的三方模块 ws，与 浏览器端 WebSocket 使用类似
const WebSocket = require("ws");
const { WebSocketServer } = WebSocket;
const JWT = require("../utils/jwt");

const wss = new WebSocketServer({ port: 8080 });

const WebSocketType = {
    Error: 0,
    NotAuthorize: 401,
    GroupList: 1,
    GroupChat: 2,
    SingleChat: 3,
};

function createMsg(type, fromUser, toUser, data) {
    return JSON.stringify({
        type,
        fromUser,
        toUser,
        data,
    });
}

function sendAll(wss, ws, data, includesSelf=false) {
  wss.clients.forEach((client) => {
    if (includesSelf) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false });
      }
    } else {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false });
      }
    }
  });
}

function sendTo(username, data, wss) {
    const target = [...wss.clients].find(
        (client) =>
            client.username === username && client.readyState === WebSocket.OPEN
    );
    target && target.send(data, { binary: false });
}

function getUserList(wss) {
    return [...wss.clients].map(client => client.username);
}

// 回调函数的参数 ws 表示每个单独的客户端对象
wss.on("connection", function connection(ws, req) {
    const urlObj = new URL(req.url, "http://localhost:8080");
    const token = urlObj.searchParams.get("token");
    const userInfo = JWT.verify(token);

    ws.onclose = () => {
        sendAll(
            wss,
            ws,
            createMsg(
                WebSocketType.GroupList,
                "server",
                "all",
                getUserList(wss)
            ),
            true
        );
    }

    if (!userInfo) {
        // 第一个参数必须是 type string or instance of Buffer, ArrayBuffer, Array, Array-like Object.
        ws.send(
            createMsg(WebSocketType.NotAuthorize, null, "token 无效或已过期！")
        );
        ws.close();
        return;
    }

    ws.username = userInfo.username;

    ws.on("error", console.error);

    sendAll(
      wss,
      ws,
      createMsg(
        WebSocketType.GroupChat,
        "server",
        "all",
        `欢迎${userInfo.username}来到聊天室！`
      ),
      true
    );

    sendAll(
      wss,
      ws,
      createMsg(WebSocketType.GroupList, "server", "all", getUserList(wss)),
      true
    );

    ws.on("message", function message(data) {
        try {
            data = JSON.parse(data);
        } catch { }

        switch (data.type) {
            // case WebSocketType.GroupList:
            //     ws.send();
            //     break;

            case WebSocketType.GroupChat:
                sendAll(
                    wss,
                    ws,
                    createMsg(data.type, ws.username, data.toUser, data.data)
                );
                break;

            case WebSocketType.SingleChat:
                sendTo(
                    data.toUser,
                    createMsg(data.type, ws.username, data.toUser, data.data),
                    wss
                );
                break;

            default:
                break;
        }
    });
});
