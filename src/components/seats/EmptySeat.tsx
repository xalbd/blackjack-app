import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export function EmptySeat({
  seat,
  sendJson,
}: {
  seat: number;
  sendJson: SendJsonMessage;
}) {
  return (
    <Button
      variant="default"
      className={`bg-zinc-300 p-4 rounded-lg h-full hover:bg-zinc-400 flex flex-col shadow-inner`}
      onClick={() => sendJson({ action: "join", seat })}
    >
      <CirclePlus size={28} color="#000000" strokeWidth={1.5} />
      <p className="mt-4 text-lg text-black">Join</p>
    </Button>
  );
}
