import React from "react";
import { messageSchema, MessageType } from "../utils/schema";
import { z } from "zod";
import Hands from "./Hands";

const socket = new WebSocket("ws://localhost:8080/");

export default function Game() {
  const [table, setTable] = React.useState<MessageType | null>(null);
  const [bet, setBet] = React.useState(0);

  socket.onmessage = (event) => {
    try {
      const data = messageSchema.parse(JSON.parse(event.data));
      setTable(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues);
      }
    }
  };

  console.dir(table);

  if (!table) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>Player {table.playerId}</h2>
        <h2>
          Money:{" "}
          {
            table.players.find((p) => {
              return table.playerId === p.id;
            })?.money
          }
        </h2>
        <h2>Bet: {bet}</h2>
        <Hands
          hands={table.hands}
          activeHand={table.activeHand}
          playerId={table.playerId}
        />
        <button onClick={() => setBet(bet + 10)}>+10</button>
        <button
          onClick={() =>
            socket.send(JSON.stringify({ action: "bet", bet: bet }))
          }
        >
          Bet
        </button>
        <button onClick={() => socket.send(JSON.stringify({ action: "end" }))}>
          Start
        </button>
      </div>
      <div>
        <button onClick={() => socket.send(JSON.stringify({ action: "hit" }))}>
          Hit
        </button>
        <button
          onClick={() => socket.send(JSON.stringify({ action: "stand" }))}
        >
          Stand
        </button>
        <button
          onClick={() => socket.send(JSON.stringify({ action: "double" }))}
        >
          Double
        </button>
        <button
          onClick={() => socket.send(JSON.stringify({ action: "split" }))}
        >
          Split
        </button>
      </div>
    </>
  );
}
