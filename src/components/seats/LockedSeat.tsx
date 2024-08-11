import { Check } from "lucide-react";
import { Seat } from "@/components/seats/Seat";

export function LockedSeat({ player, bet }: { player: string; bet: number }) {
  return (
    <Seat>
      <Check size={28} color="#000000" strokeWidth={1.5} />
      <span className="my-4 w-full break-words overflow-hidden">{player}</span>
      <span className="text-4xl">${bet}</span>
    </Seat>
  );
}
