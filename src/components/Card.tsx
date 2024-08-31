import spade_2 from "@/assets/cards/spade_2.svg";
import spade_3 from "@/assets/cards/spade_3.svg";
import spade_4 from "@/assets/cards/spade_4.svg";
import spade_5 from "@/assets/cards/spade_5.svg";
import spade_6 from "@/assets/cards/spade_6.svg";
import spade_7 from "@/assets/cards/spade_7.svg";
import spade_8 from "@/assets/cards/spade_8.svg";
import spade_9 from "@/assets/cards/spade_9.svg";
import spade_A from "@/assets/cards/spade_A.svg";
import spade_J from "@/assets/cards/spade_J.svg";
import spade_K from "@/assets/cards/spade_K.svg";
import spade_Q from "@/assets/cards/spade_Q.svg";
import spade_T from "@/assets/cards/spade_T.svg";
import heart_2 from "@/assets/cards/heart_2.svg";
import heart_3 from "@/assets/cards/heart_3.svg";
import heart_4 from "@/assets/cards/heart_4.svg";
import heart_5 from "@/assets/cards/heart_5.svg";
import heart_6 from "@/assets/cards/heart_6.svg";
import heart_7 from "@/assets/cards/heart_7.svg";
import heart_8 from "@/assets/cards/heart_8.svg";
import heart_9 from "@/assets/cards/heart_9.svg";
import heart_A from "@/assets/cards/heart_A.svg";
import heart_J from "@/assets/cards/heart_J.svg";
import heart_K from "@/assets/cards/heart_K.svg";
import heart_Q from "@/assets/cards/heart_Q.svg";
import heart_T from "@/assets/cards/heart_T.svg";
import diamond_2 from "@/assets/cards/diamond_2.svg";
import diamond_3 from "@/assets/cards/diamond_3.svg";
import diamond_4 from "@/assets/cards/diamond_4.svg";
import diamond_5 from "@/assets/cards/diamond_5.svg";
import diamond_6 from "@/assets/cards/diamond_6.svg";
import diamond_7 from "@/assets/cards/diamond_7.svg";
import diamond_8 from "@/assets/cards/diamond_8.svg";
import diamond_9 from "@/assets/cards/diamond_9.svg";
import diamond_A from "@/assets/cards/diamond_A.svg";
import diamond_J from "@/assets/cards/diamond_J.svg";
import diamond_K from "@/assets/cards/diamond_K.svg";
import diamond_Q from "@/assets/cards/diamond_Q.svg";
import diamond_T from "@/assets/cards/diamond_T.svg";
import club_2 from "@/assets/cards/club_2.svg";
import club_3 from "@/assets/cards/club_3.svg";
import club_4 from "@/assets/cards/club_4.svg";
import club_5 from "@/assets/cards/club_5.svg";
import club_6 from "@/assets/cards/club_6.svg";
import club_7 from "@/assets/cards/club_7.svg";
import club_8 from "@/assets/cards/club_8.svg";
import club_9 from "@/assets/cards/club_9.svg";
import club_A from "@/assets/cards/club_A.svg";
import club_J from "@/assets/cards/club_J.svg";
import club_K from "@/assets/cards/club_K.svg";
import club_Q from "@/assets/cards/club_Q.svg";
import club_T from "@/assets/cards/club_T.svg";
import back from "@/assets/cards/back.svg";
import { CardType } from "@/utils/schema";

const cards = [
  [
    spade_A,
    spade_2,
    spade_3,
    spade_4,
    spade_5,
    spade_6,
    spade_7,
    spade_8,
    spade_9,
    spade_T,
    spade_J,
    spade_Q,
    spade_K,
  ],
  [
    heart_A,
    heart_2,
    heart_3,
    heart_4,
    heart_5,
    heart_6,
    heart_7,
    heart_8,
    heart_9,
    heart_T,
    heart_J,
    heart_Q,
    heart_K,
  ],
  [
    diamond_A,
    diamond_2,
    diamond_3,
    diamond_4,
    diamond_5,
    diamond_6,
    diamond_7,
    diamond_8,
    diamond_9,
    diamond_T,
    diamond_J,
    diamond_Q,
    diamond_K,
  ],
  [
    club_A,
    club_2,
    club_3,
    club_4,
    club_5,
    club_6,
    club_7,
    club_8,
    club_9,
    club_T,
    club_J,
    club_Q,
    club_K,
  ],
];

export function Card({
  card,
  className,
  style,
}: {
  card?: CardType;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      className={className}
      src={card ? cards[card.suit][card.rank - 1] : back}
      style={style}
    />
  );
}
