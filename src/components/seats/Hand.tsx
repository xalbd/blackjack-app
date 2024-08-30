import { formattedScores } from "@/utils/blackjack";
import { HandType } from "@/utils/schema";
import { Seat } from "@/components/seats/Seat";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { CardStack } from "@/components/seats/CardStack";
import { Progress } from "../ui/progress";
import React from "react";

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
  const requestRef = React.useRef<number | null>(null);
  const [progressValue, setProgressValue] = React.useState(0);

  const animateProgress = React.useCallback(() => {
    const now = Date.now();
    if (received + 5000 >= now) {
      setProgressValue(100 * ((now - received) / 5000));
      requestRef.current = requestAnimationFrame(animateProgress);
    }
  }, [received]);

  React.useEffect(() => {
    if (active && progressValue < 100) {
      requestRef.current = requestAnimationFrame(animateProgress);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [active, animateProgress, owned, progressValue]);

  const bg = clsx({
    "bg-zinc-100 scale-105 shadow-2xl border border-zinc-300": owned && active,
  });

  return (
    <Seat className={`${bg} justify-between p-0`}>
      <h2 className="text-lg font-bold w-full truncate pt-4">{displayName}</h2>
      {hand.cards && <CardStack cards={hand.cards} />}
      <div
        className={clsx(!active && "mb-2", "flex flex-col items-center gap-1")}
      >
        <span className="text-4xl">${hand.bet}</span>
        {hand.cards && (
          <Badge className="text-base">{formattedScores(hand.cards)}</Badge>
        )}
      </div>
      {active && (
        <Progress value={progressValue} className="rounded-none h-3 mt-2" />
      )}
    </Seat>
  );
}
