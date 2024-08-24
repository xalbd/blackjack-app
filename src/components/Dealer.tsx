import { formattedScores } from "@/utils/blackjack";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/Card";
import { CardType } from "@/utils/schema";

export function Dealer({ cards }: { cards: CardType[] | null }) {
  return (
    <div className="flex flex-col bg-zinc-200 p-4 rounded-lg flex-1 drop-shadow-lg border border-zinc-300">
      <div className="flex justify-between">
        <span className="text-lg font-bold">Dealer</span>
        <Badge className="text-base">
          {cards ? formattedScores(cards) : "?"}
        </Badge>
      </div>
      <div className="min-h-0 flex flex-1 justify-center">
        {cards?.map((c, i) => (
          <Card rank={c.rank} key={i} className="min-h-0 max-h-full" />
        ))}
      </div>
    </div>
  );
}
