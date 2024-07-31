import { z } from "zod";

const cardSchema = z.object({
  rank: z.number(),
  suit: z.number(),
});

const handSchema = z.object({
  cards: z.nullable(z.array(cardSchema)),
  bet: z.number(),
  playerId: z.string(),
});

const playerSchema = z.object({
  id: z.string(),
  money: z.number(),
  doneBetting: z.boolean(),
});

export const messageSchema = z.object({
  playerId: z.string(),
  activeHand: z.number(),
  players: z.array(playerSchema),
  hands: z.array(handSchema),
});

export type CardType = z.infer<typeof cardSchema>;
export type HandType = z.infer<typeof handSchema>;
export type PlayerType = z.infer<typeof playerSchema>;
export type MessageType = z.infer<typeof messageSchema>;
