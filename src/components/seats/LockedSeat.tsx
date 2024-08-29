import { Check } from "lucide-react";
import { Seat } from "@/components/seats/Seat";

export function LockedSeat({
  displayName,
  bet,
}: {
  displayName: string;
  bet: number;
}) {
  return (
    <Seat>
      <Check size={28} color="#000000" strokeWidth={1.5} />
      <span className="my-4 w-full break-words overflow-hidden">
        {displayName}
      </span>
      <span className="text-4xl">${bet}</span>
    </Seat>
  );
}
