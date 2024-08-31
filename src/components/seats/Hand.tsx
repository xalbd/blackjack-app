import { formattedScores } from "@/utils/blackjack";
import { HandType } from "@/utils/schema";
import { Seat } from "@/components/seats/Seat";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { CardStack } from "@/components/seats/CardStack";
import { Progress } from "../ui/progress";
import { useProgress } from "@/hooks/useProgress";

export function Hand({
  hand,
  displayName,
  active,
  owned,
  received,
}: {
  hand: HandType;
  displayName: string;
  active: boolean;
  owned: boolean;
  received: number;
}) {
  const { progressValue } = useProgress(received, 5);

  const bg = clsx({
    "bg-zinc-100 scale-105 shadow-2xl border border-zinc-300": owned && active,
  });

  return (
    <Seat className={`${bg} justify-between p-0`}>
      <h2 className="text-lg font-bold w-full truncate pt-4">{displayName}</h2>
      {hand.cards && <CardStack cards={hand.cards} />}
      <div
        className={clsx(!active && "mb-4", "flex flex-col items-center gap-1")}
      >
        <span className="text-4xl">${hand.bet}</span>
        {hand.cards && (
          <Badge className="text-base">{formattedScores(hand.cards)}</Badge>
        )}
      </div>
      {active && (
        <Progress
          value={progressValue}
          className="rounded-none h-3 mt-2 bg-inherit"
        />
      )}
    </Seat>
  );
}
