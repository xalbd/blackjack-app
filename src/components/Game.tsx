import React from "react";
import { tableSchema, TableType } from "../utils/schema";
import { z } from "zod";
import useFirebase from "../hooks/firebase";
import useWebSocket from "react-use-websocket";
import { Players } from "./Players";
import { cardToString } from "@/utils/blackjack";
import { Header } from "./Header";
import { PlayArea } from "./PlayArea";

export default function Game() {
  const [table, setTable] = React.useState<TableType>({} as TableType);
  const [money, setMoney] = React.useState(0);
  const user = useFirebase();

  const { sendMessage, sendJsonMessage, readyState } = useWebSocket(
    import.meta.env.VITE_PROD_SERVER,
    {
      onMessage: (event) => {
        try {
          const data = tableSchema.parse(JSON.parse(event.data));
          setTable(data);
          setMoney(
            data.players.find((p) => {
              return data.playerId === p.id;
            })?.money ?? 0
          );
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

  if (!table.playerId || !sendJsonMessage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#fff] p-6 gap-6 flex flex-col h-screen">
      <Header />
      <div className="flex justify-between gap-6 flex-1 basis-1/3">
        <div className="bg-[#f0f0f0] p-4 rounded-lg flex-1">
          <h2 className="text-lg font-bold mb-2">Dealer</h2>
          <div className="flex items-center justify-center">
            <div className="bg-[#006400] text-white font-bold text-4xl px-4 py-2 rounded-lg">
              {table.dealer?.map((c, i) => (
                <span key={i}>{cardToString(c)} </span>
              ))}
            </div>
          </div>
        </div>
        <Players players={table.players} />
        <h2 className="text-3xl font-bold">${money}</h2>
      </div>
      <PlayArea sendJson={sendJsonMessage} table={table} />
    </div>
  );
}
