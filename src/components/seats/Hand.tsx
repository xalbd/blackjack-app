import { cardToString } from "@/utils/blackjack";
import { HandType } from "@/utils/schema";
import { Seat } from "@/components/seats/Seat";

export function Hand({
  hand,
  active,
  owned,
}: {
  hand: HandType;
  active: boolean;
  owned: boolean;
}) {
  const bg = active
    ? owned
      ? "bg-emerald-200"
      : "bg-neutral-200"
    : "bg-[#f0f0f0]";

  return (
    <Seat className={bg}>
      <h2 className="text-lg font-bold mb-2">{hand.playerId}</h2>
      <div className="flex items-center justify-center h-32">
        {hand.cards && (
          <div className="bg-[#006400] text-white font-bold text-2xl px-4 py-2 rounded-lg">
            {hand.cards?.map((c, i) => (
              <span key={i}>{cardToString(c)} </span>
            ))}
          </div>
        )}
      </div>
      <span className="text-4xl">${hand.bet}</span>
    </Seat>
  );
}
