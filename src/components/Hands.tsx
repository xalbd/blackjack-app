import { HandType } from "../utils/schema";
import Hand from "./Hand";

export default function Hands({
  hands,
  activeHand,
  playerId,
}: {
  hands: HandType[];
  activeHand: number;
  playerId: string;
}) {
  return (
    <div>
      {hands.map((hand, i) => (
        <Hand
          key={i}
          hand={hand}
          active={i === activeHand}
          owned={playerId === hand.playerId}
        />
      ))}
    </div>
  );
}
