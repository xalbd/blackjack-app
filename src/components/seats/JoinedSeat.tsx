import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { Seat } from "@/components/seats/Seat";

export function JoinedSeat({
  seat,
  player,
  self,
  sendMessage,
}: {
  seat: number;
  player: string;
  self: boolean;
  sendMessage: SendJsonMessage;
}) {
  return (
    <Seat className="justify-between">
      <p className="w-full break-words overflow-hidden mt-16 text-2xl">
        {self ? "You" : player}
      </p>
      {self ? (
        <Button
          variant="outline"
          onClick={() => sendMessage({ action: "leave", seat })}
        >
          Leave Seat
        </Button>
      ) : (
        <ChevronDown
          className="mb-2"
          size={28}
          color="#000000"
          strokeWidth={1.5}
        />
      )}
    </Seat>
  );
}
