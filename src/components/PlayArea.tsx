import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { Betting } from "@/components/Betting";
import { Hands } from "@/components/Hands";
import { Button } from "@/components/ui/button";
import { TableType } from "@/utils/schema";
import React from "react";
import { AuthContext } from "./AuthContext";

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
  const { user } = React.useContext(AuthContext);

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

  function betAll() {
    bets.forEach((bet, seat) => {
      if (
        table.hands[seat].playerId === user?.uid &&
        bet &&
        parseInt(bet) >= 10
      ) {
        sendJson({ action: "bet", bet: parseInt(bet), seat });
      }
    });
  }

  return (
    <>
      <Hands table={table} sendJson={sendJson} bets={bets} setBets={setBets} />
      {table.status === 0 ? (
        <Betting
          addToBets={addToBets}
          setAllBets={setAllBets}
          betAll={betAll}
        />
      ) : (
        <div className="flex gap-4">
          <Button onClick={() => sendJson({ action: "hit" })}>Hit</Button>
          <Button onClick={() => sendJson({ action: "stand" })}>Stand</Button>
          <Button onClick={() => sendJson({ action: "double" })}>Double</Button>
          <Button onClick={() => sendJson({ action: "split" })}>Split</Button>
        </div>
      )}
    </>
  );
}
