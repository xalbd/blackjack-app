import { z } from "zod";

const cardSchema = z.object({
  rank: z.number(),
  suit: z.number(),
});

const handSchema = z.object({
  cards: z.nullable(z.array(cardSchema)),
  bet: z.number(),
  playerId: z.string(),
  split: z.boolean(),
});

const playerSchema = z.object({
  id: z.string(),
  money: z.number(),
});

export const tableSchema = z.object({
  activeHand: z.number(),
  players: z.array(playerSchema),
  hands: z.array(handSchema),
  dealer: z.nullable(z.array(cardSchema)),
  status: z.number(),
});

export type CardType = z.infer<typeof cardSchema>;
export type HandType = z.infer<typeof handSchema>;
export type PlayerType = z.infer<typeof playerSchema>;
export type TableType = z.infer<typeof tableSchema>;
