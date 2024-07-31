import { CardType } from "./schema";

function suitToString(suit: number): string {
  switch (suit) {
    case 0:
      return "Spades";
    case 1:
      return "Hearts";
    case 2:
      return "Diamonds";
    case 3:
      return "Clubs";
    default:
      return "";
  }
}

function rankToString(value: number): string {
  switch (value) {
    case 1:
      return "Ace";
    case 11:
      return "Jack";
    case 12:
      return "Queen";
    case 13:
      return "King";
    default:
      return value.toString();
  }
}

export function cardToString(card: CardType): string {
  return `${rankToString(card.rank)} of ${suitToString(card.suit)}`;
}
