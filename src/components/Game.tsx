import React from "react";
import { messageSchema, MessageType } from "../utils/schema";
import { z } from "zod";
import Hands from "./Hands";
import useFirebase from "../hooks/firebase";
import useWebSocket from "react-use-websocket";

export default function Game() {
  const [table, setTable] = React.useState<MessageType | null>(null);
  const [bet, setBet] = React.useState(0);
  const user = useFirebase();

  const { sendMessage, sendJsonMessage, readyState } = useWebSocket(
    import.meta.env.VITE_PROD_SERVER,
    {
      onMessage: (event) => {
        try {
          const data = messageSchema.parse(JSON.parse(event.data));
          setTable(data);
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err.issues);
          }
        }
      },
      shouldReconnect: () => true,
    }
  );

  React.useEffect(() => {
    if (user && readyState === 1) {
      user.getIdToken(true).then((token) => {
        sendMessage(token);
      });
    }
  }, [user, sendMessage, readyState]);

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
        <button onClick={() => sendJsonMessage({ action: "bet", bet: bet })}>
          Bet
        </button>
        <button onClick={() => sendJsonMessage({ action: "end" })}>
          Start
        </button>
      </div>
      <div>
        <button onClick={() => sendJsonMessage({ action: "hit" })}>Hit</button>
        <button onClick={() => sendJsonMessage({ action: "stand" })}>
          Stand
        </button>
        <button onClick={() => sendJsonMessage({ action: "double" })}>
          Double
        </button>
        <button onClick={() => sendJsonMessage({ action: "split" })}>
          Split
        </button>
      </div>
    </>
  );
}
