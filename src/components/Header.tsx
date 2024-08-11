import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold">Blackjack</h1>
      </div>
      <Separator />
    </div>
  );
}
