import React from "react";
import { tableSchema, TableType } from "@/utils/schema";
import { z } from "zod";
import useWebSocket from "react-use-websocket";
import { Players } from "@/components/Players";
import { Header } from "@/components/Header";
import { PlayArea } from "@/components/PlayArea";
import { Dealer } from "@/components/Dealer";
import { AuthContext } from "@/components/AuthContext";

export default function Game() {
  const queue = React.useRef<TableType[]>([]);
  const waiting = React.useRef(false);
  const [table, setTable] = React.useState<TableType | null>(null);
  const [money, setMoney] = React.useState(0);
  const auth = React.useContext(AuthContext);

  const queueNewTable = React.useCallback(
    (t: TableType) => {
      function execute(t: TableType) {
        waiting.current = true;
        setTable(t);
        setMoney(
          t.players.find((p) => {
            return auth?.uid === p.id;
          })?.money ?? 0
        );
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
    },
    [auth]
  );

  const { sendMessage, sendJsonMessage, readyState } = useWebSocket(
    import.meta.env.VITE_BACKEND,
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
    if (auth && readyState === 1) {
      auth.getIdToken(true).then((token) => {
        sendMessage(token);
      });
    }
  }, [auth, sendMessage, readyState]);

  return (
    <div className="bg-zinc-100 p-6 gap-6 flex flex-col h-screen">
      <Header />
      {!table ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex gap-6 h-1/4">
            <Dealer cards={table.dealer} />
            <Players players={table.players} />
            <h2 className="text-3xl font-bold">${money}</h2>
          </div>
          <PlayArea sendJson={sendJsonMessage} table={table} />
        </>
      )}
    </div>
  );
}
