import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { Betting } from "./Betting";
import { Hands } from "./Hands";
import { Button } from "./ui/button";
import { TableType } from "@/utils/schema";
import React from "react";

export function PlayArea({
  sendJson,
  table,
}: {
  sendJson: SendJsonMessage;
  table: TableType;
}) {
  const [bets, setBets] = React.useState(
    new Map(table.hands.map((_, i) => [i, ""]))
  );

  function addToBets(amount: number) {
    const newBets = new Map(bets);
    newBets.forEach((bet, seat) => {
      newBets.set(
        seat,
        bet ? (parseInt(bet) + amount).toString() : amount.toString()
      );
    });
    setBets(newBets);
  }

  function setAllBets(amount: number) {
    const newBets = new Map(bets);
    newBets.forEach((_, seat) => {
      newBets.set(seat, amount.toString());
    });
    setBets(newBets);
  }

  return (
    <>
      <Hands table={table} sendJson={sendJson} bets={bets} setBets={setBets} />
      <div className="flex justify-between">
        <div className="flex gap-4">
          {table.activeHand !== -1 && (
            <>
              <Button onClick={() => sendJson({ action: "hit" })}>Hit</Button>
              <Button onClick={() => sendJson({ action: "stand" })}>
                Stand
              </Button>
              <Button onClick={() => sendJson({ action: "double" })}>
                Double
              </Button>
              <Button onClick={() => sendJson({ action: "split" })}>
                Split
              </Button>
            </>
          )}
        </div>
        <Betting addToBets={addToBets} setAllBets={setAllBets} />
      </div>
    </>
  );
}
