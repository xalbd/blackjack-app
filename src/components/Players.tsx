import { PlayerType } from "@/utils/schema";
import { ScrollArea } from "./ui/scroll-area";

export function Players({ players }: { players: PlayerType[] }) {
  return (
    <div className="bg-[#f0f0f0] p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Players</h2>
      <ScrollArea className={`rounded-lg flex-1`}>
        {players.map((player) => (
          <div key={player.id} className="flex flex-row justify-between gap-4">
            <p>{player.id}</p>
            <p>${player.money}</p>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
