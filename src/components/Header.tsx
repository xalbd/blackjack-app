import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Blackjack</h1>
      </div>
      <Separator />
    </div>
  );
}
