import { HandType, TableType } from "../utils/schema";
import { Hand } from "./seats/Hand";
import { OtherBettingSeat } from "./seats/OtherBettingSeat";
import { LockedSeat } from "./seats/LockedSeat";
import { EmptySeat } from "./seats/EmptySeat";
import { BettingSeat } from "./seats/BettingSeat";
import { JoinedSeat } from "./seats/JoinedSeat";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export function Hands({
  table,
  sendJson,
  bets,
  setBets,
}: {
  table: TableType;
  sendJson: SendJsonMessage;
  bets: Map<number, string>;
  setBets: (bets: Map<number, string>) => void;
}) {
  const activeHand = table.activeHand;
  const playerId = table.playerId;
  const hands = table.hands;

  function displayHand(hand: HandType, i: number) {
    // betting phase
    if (activeHand === -1) {
      if (hand.playerId === "") {
        return <EmptySeat key={i} seat={i} sendMessage={sendJson} />;
      } else if (hand.playerId !== playerId && hand.bet === 0) {
        return <OtherBettingSeat key={i} player={hand.playerId} />;
      } else if (hand.bet === 0) {
        return (
          <BettingSeat
            key={i}
            seat={i}
            sendMessage={sendJson}
            bet={bets.get(i) || ""}
            setBet={(value) => {
              const newBets = new Map(bets);
              newBets.set(i, value);
              setBets(newBets);
            }}
          />
        );
      } else {
        return <LockedSeat key={i} player={hand.playerId} bet={hand.bet} />;
      }
    }
    // playing phase
    else {
      if (hand.playerId === "") {
        return <EmptySeat key={i} seat={i} sendMessage={sendJson} />;
      } else if (!hand.cards) {
        return (
          <JoinedSeat
            key={i}
            seat={i}
            player={hand.playerId}
            self={playerId === hand.playerId}
            sendMessage={sendJson}
          />
        );
      } else {
        return (
          <Hand
            key={i}
            hand={hand}
            active={i === activeHand}
            owned={playerId === hand.playerId}
          />
        );
      }
    }
  }

  return (
    <div className="flex flex-row flex-1 items-center justify-between gap-6 basis-2/3">
      {hands.map((hand, i) => displayHand(hand, i))}
    </div>
  );
}
