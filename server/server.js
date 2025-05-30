const WebSocket = require('ws');

// 创建 WebSocket 服务器，监听 8080 端口
const wss = new WebSocket.Server({ port: 8080 });

// 当有新的客户端连接时
wss.on('connection', (ws) => {
  console.log('新的客户端已连接');

  // 当收到客户端消息时
  ws.on('message', (message) => {
    // 确保消息是字符串
    const messageStr = message.toString();
    console.log('收到消息: %s', messageStr);

    // 广播消息给所有连接的客户端
    wss.clients.forEach(client => {
      // 防止自己给自己发送消息
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
      }
    });
  });

  // 当客户端断开连接时
  ws.on('close', () => {
    console.log('客户端已断开连接');
  });
});

console.log('WebSocket 服务器已启动在 ws://localhost:8080'); 