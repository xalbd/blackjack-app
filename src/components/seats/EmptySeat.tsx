import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export function EmptySeat({
  seat,
  sendMessage,
}: {
  seat: number;
  sendMessage: SendJsonMessage;
}) {
  return (
    <Button
      variant="default"
      className={`bg-[#f0f0f0] p-4 rounded-lg flex-1 h-full hover:bg-[#c0c0c0] flex flex-col`}
      onClick={() => sendMessage({ action: "join", seat })}
    >
      <CirclePlus size={28} color="#000000" strokeWidth={1.5} />
      <p className="mt-4 text-lg text-black">Join</p>
    </Button>
  );
}
