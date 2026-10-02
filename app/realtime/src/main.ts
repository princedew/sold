import { WebSocketServer, type RawData, type WebSocket } from "ws";
import redisWorkerForRealtimeServices from "./worker"
import type { UserId } from "@packages/type/realtimeTypes";
import { WS_MSG_TYPE } from "@packages/type/enums";

export const registry = new Map<UserId, WebSocket>();

function register(userId: UserId, ws:WebSocket) {
  registry.set(userId, ws);
}

redisWorkerForRealtimeServices();

const wss = new WebSocketServer({ port: 8000 });

console.log("On WebSocketServer Port:8000");
wss.on("connection", (ws:WebSocket) => {
  let socketUserId: UserId; 
  console.log(`> CLIENT CONNECTED`);
  ws.send(JSON.stringify({ type: "welcome", message: "hello client" }));

  ws.on("message", (msg: RawData) => {
    const data = JSON.parse(msg.toString());
    if (data.type === WS_MSG_TYPE.CONNECT) {
      register(data.userId, ws);
      socketUserId = data.userId;
    }
  });

  ws.on("error", (err: Error) => {
    console.log("\n> WS_ERROR: ", err.message);
  });

  ws.on("close", () => {
    registry.delete(socketUserId);
    console.log("CLIENT DISCONNECTED");
  });
});
