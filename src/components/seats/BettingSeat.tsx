import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { Seat } from "@/components/seats/Seat";

export function BettingSeat({
  seat,
  sendJson,
  bet,
  setBet,
}: {
  seat: number;
  sendJson: SendJsonMessage;
  bet: string;
  setBet: (value: string) => void;
}) {
  return (
    <Seat className="justify-between">
      <Button
        variant="outline"
        className="self-start"
        onClick={() => sendJson({ action: "leave", seat })}
      >
        <X size={28} strokeWidth={1.5} />
      </Button>

      <div className="flex flex-row text-4xl items-center justify-center">
        <span className="pr-2">$</span>
        <Input
          className="text-4xl h-12 w-3/4"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={bet}
          onChange={(e) =>
            /^\d*$/.test(e.target.value) && setBet(e.target.value)
          }
        ></Input>
      </div>

      <div className="flex flex-row justify-between self-stretch flex-wrap">
        <Button variant="outline" onClick={() => setBet("")}>
          Clear
        </Button>
        <Button
          variant="default"
          disabled={!bet || parseInt(bet) < 10}
          onClick={() =>
            sendJson({ action: "bet", bet: bet ? parseInt(bet) : 0, seat })
          }
        >
          Bet
        </Button>
      </div>
    </Seat>
  );
}
