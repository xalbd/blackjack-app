import { HandType, nameOfPlayer, TableType } from "@/utils/schema";
import { Hand } from "@/components/seats/Hand";
import { OtherBettingSeat } from "@/components/seats/OtherBettingSeat";
import { LockedSeat } from "@/components/seats/LockedSeat";
import { EmptySeat } from "@/components/seats/EmptySeat";
import { BettingSeat } from "@/components/seats/BettingSeat";
import { JoinedSeat } from "@/components/seats/JoinedSeat";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import React from "react";
import { AuthContext } from "@/components/AuthContext";

export function Hands({
  table,
  sendJson,
  bets,
  setBets,
}: {
  table: TableType;
  sendJson: SendJsonMessage;
  bets: Map<number, string>;
  setBets: React.Dispatch<React.SetStateAction<Map<number, string>>>;
}) {
  const activeHand = table.activeHand;
  const hands = table.hands;
  const { user } = React.useContext(AuthContext);
  const playerId = user?.uid;

  function displayHand(hand: HandType, i: number) {
    const displayName = nameOfPlayer(table, hand.playerId);

    // betting phase
    if (table.status === 0) {
      if (hand.playerId === "") {
        return <EmptySeat key={i} seat={i} sendJson={sendJson} />;
      } else if (hand.playerId !== playerId && hand.bet === 0) {
        return <OtherBettingSeat key={i} displayName={displayName} />;
      } else if (hand.bet === 0) {
        return (
          <BettingSeat
            key={i}
            seat={i}
            sendJson={sendJson}
            bet={bets.get(i) || ""}
            setBet={(value) => {
              const newBets = new Map(bets);
              newBets.set(i, value);
              setBets(newBets);
            }}
          />
        );
      } else {
        return <LockedSeat key={i} displayName={displayName} bet={hand.bet} />;
      }
    }
    // playing/dealer phase
    else {
      if (hand.playerId === "") {
        return <EmptySeat key={i} seat={i} sendJson={sendJson} />;
      } else if (!hand.cards) {
        return (
          <JoinedSeat
            key={i}
            seat={i}
            displayName={displayName}
            owned={playerId === hand.playerId}
            sendJson={sendJson}
          />
        );
      } else {
        return (
          <Hand
            key={i}
            hand={hand}
            displayName={displayName}
            active={i === activeHand}
            owned={playerId === hand.playerId}
          />
        );
      }
    }
  }

  return (
    <div className="flex-1 grid grid-flow-col auto-cols-fr items-center justify-between gap-6 my-2">
      {hands.map((hand, i) => displayHand(hand, i))}
    </div>
  );
}
