import React from "react";
import { tableSchema, TableType } from "@/utils/schema";
import { z } from "zod";
import useWebSocket from "react-use-websocket";
import { Players } from "@/components/Players";
import { PlayArea } from "@/components/PlayArea";
import { Dealer } from "@/components/Dealer";
import { AuthContext } from "@/components/AuthContext";
import { Header } from "@/components/Header";

export default function Game({ room }: { room: string }) {
  const queue = React.useRef<TableType[]>([]);
  const waiting = React.useRef(false);
  const [table, setTable] = React.useState<TableType | null>(null);
  const { user } = React.useContext(AuthContext);

  const queueNewTable = React.useCallback((t: TableType) => {
    function execute(t: TableType) {
      waiting.current = true;
      setTable(t);
      setTimeout(play, 500);
    }

    function play() {
      waiting.current = false;
      const next = queue.current.shift();
      if (next) {
        execute(next);
      }
    }

    if (waiting.current) {
      queue.current.push(t);
    } else {
      execute(t);
    }
  }, []);

  const { sendMessage, sendJsonMessage, readyState } = useWebSocket(
    `${import.meta.env.VITE_BACKEND_WS}/room/${room}/ws`,
    {
      onMessage: (event) => {
        try {
          const data = tableSchema.parse(JSON.parse(event.data));
          queueNewTable(data);
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

  return (
    <>
      <Header />
      {!table ? (
        <div className="mx-auto">Loading...</div>
      ) : (
        <>
          <div className="flex gap-6 h-1/4">
            <Dealer
              bettingTimer={
                table.status === 0 &&
                table.hands.some((h) => h.bet !== 0 && h.playerId !== "")
              }
              received={table.time}
              cards={table.dealer}
            />
            <Players players={table.players} />
            <h2 className="text-3xl font-bold">
              $
              {table.players.find((p) => {
                return user?.uid === p.id;
              })?.money ?? 0}
            </h2>
          </div>
          <PlayArea sendJson={sendJsonMessage} table={table} />
        </>
      )}
    </>
  );
}
