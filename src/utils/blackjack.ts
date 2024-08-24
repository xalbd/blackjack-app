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

function value(card: CardType): number {
  if (card.rank >= 10) {
    return 10;
  } else {
    return card.rank;
  }
}

export function scores(cards: CardType[]): number[] {
  const hardTotal = cards.reduce((acc, c) => acc + value(c), 0);
  const aceCount = cards.filter((c) => c.rank === 1).length;

  const scores = [];
  if (hardTotal <= 21) {
    scores.push(hardTotal);
  }
  if (aceCount > 0 && hardTotal + 10 <= 21) {
    scores.push(hardTotal + 10);
  }

  return scores;
}

export function formattedScores(cards: CardType[]): string {
  const s = scores(cards);

  if (cards.length === 2 && s.includes(21)) {
    return "Blackjack!";
  } else if (s.length === 0) {
    return "Bust";
  }

  return s.join(" / ");
}
