import { formattedScores } from "@/utils/blackjack";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/Card";
import { CardType } from "@/utils/schema";
import { Progress } from "./ui/progress";
import { useProgress } from "@/hooks/useProgress";

export function Dealer({
  bettingTimer,
  cards,
  received,
}: {
  bettingTimer: boolean;
  cards: CardType[] | null;
  received: number;
}) {
  const { progressValue } = useProgress(received, 15);

  return (
    <div className="flex flex-col bg-zinc-200 rounded-lg flex-1 drop-shadow-lg border border-zinc-300 overflow-hidden">
      <div className="flex justify-between mt-4 mx-4">
        <span className="text-lg font-bold">Dealer</span>
        <Badge className="text-base">
          {cards ? formattedScores(cards) : "?"}
        </Badge>
      </div>
      <div className="min-h-0 flex flex-1 justify-center mb-4">
        {cards?.map((c, i) => (
          <Card card={c} key={i} className="min-h-0 max-h-full" />
        ))}
        {cards?.length === 1 && <Card className="min-h-0 max-h-full" key={1} />}
      </div>
      {bettingTimer && (
        <Progress
          value={progressValue}
          className="rounded-none h-3 mt-2 bg-inherit"
        />
      )}
    </div>
  );
}
