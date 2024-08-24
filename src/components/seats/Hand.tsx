import { formattedScores } from "@/utils/blackjack";
import { HandType } from "@/utils/schema";
import { Seat } from "@/components/seats/Seat";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { CardStack } from "@/components/seats/CardStack";

export function Hand({
  hand,
  active,
  owned,
}: {
  hand: HandType;
  active: boolean;
  owned: boolean;
}) {
  const bg = clsx({
    "bg-zinc-100 scale-105 shadow-2xl border border-zinc-300": owned && active,
  });

  return (
    <Seat className={`${bg} justify-between`}>
      <h2 className="text-lg font-bold w-full truncate">{hand.playerId}</h2>
      {hand.cards && <CardStack cards={hand.cards} />}
      <div className="flex flex-col items-center gap-3">
        <span className="text-4xl">${hand.bet}</span>
        {hand.cards && (
          <Badge className="text-base">{formattedScores(hand.cards)}</Badge>
        )}
      </div>
    </Seat>
  );
}
