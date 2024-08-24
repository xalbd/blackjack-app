import { PlayerType } from "@/utils/schema";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Players({ players }: { players: PlayerType[] }) {
  return (
    <div className="bg-zinc-200 p-4 rounded-lg drop-shadow-lg border border-zinc-300">
      <h2 className="text-lg font-bold">Players</h2>
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
