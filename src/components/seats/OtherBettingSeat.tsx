import { Ellipsis } from "lucide-react";
import { Seat } from "@/components/seats/Seat";

export function OtherBettingSeat({ displayName }: { displayName: string }) {
  return (
    <Seat>
      <Ellipsis size={28} color="#000000" strokeWidth={1.5} />
      <span className="my-4 w-full break-words overflow-hidden">
        {displayName}
      </span>
    </Seat>
  );
}
