import { cardToString } from "../utils/blackjack";
import { HandType } from "../utils/schema";

export default function Hand({
  hand,
  active,
  owned,
}: {
  hand: HandType;
  active: boolean;
  owned: boolean;
}) {
  return (
    <div
      className={`${
        active ? (owned ? "bg-green-400" : "bg-red-400") : ""
      } my-2`}
    >
      <h2>{`${owned ? "Mine >" : "..."}${hand.bet}`}</h2>
      {hand.cards?.map((c, i) => (
        <h2 key={i}>{cardToString(c)} </h2>
      ))}
    </div>
  );
}
