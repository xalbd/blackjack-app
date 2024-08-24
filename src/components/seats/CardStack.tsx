import { CardType } from "@/utils/schema";
import { Card } from "@/components/Card";

function generateLocation(i: number) {
  switch (i) {
    case 0:
      return `bottom-0 left-0`;
    case 1:
      return `bottom-[12.5%] left-[12.5%]`;
    case 2:
      return `bottom-[25%] left-[25%]`;
    case 3:
      return `bottom-[37.5%] left-[37.5%]`;
    case 4:
      return `bottom-[50%] left-[50%]`;
  }
}

export function CardStack({ cards }: { cards: CardType[] }) {
  return (
    <div className="relative flex-1 aspect-[5/7] max-w-full my-1">
      {cards.map((c, i) => (
        <Card
          key={i}
          className={`absolute w-1/2 ${generateLocation(i)}`}
          rank={c.rank}
        />
      ))}
    </div>
  );
}
