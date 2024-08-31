import card1 from "@/assets/cards/A.svg";
import card2 from "@/assets/cards/2.svg";
import card3 from "@/assets/cards/3.svg";
import card4 from "@/assets/cards/4.svg";
import card5 from "@/assets/cards/5.svg";
import card6 from "@/assets/cards/6.svg";
import card7 from "@/assets/cards/7.svg";
import card8 from "@/assets/cards/8.svg";
import card9 from "@/assets/cards/9.svg";
import card10 from "@/assets/cards/10.svg";
import card11 from "@/assets/cards/J.svg";
import card12 from "@/assets/cards/Q.svg";
import card13 from "@/assets/cards/K.svg";

export function Card({
  rank,
  className,
  style,
}: {
  rank: number;
  className?: string;
  style: React.CSSProperties;
}) {
  const cards = [
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
    card10,
    card11,
    card12,
    card13,
  ];

  return <img className={className} src={cards[rank - 1]} style={style} />;
}
