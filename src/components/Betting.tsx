import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export function Betting({
  setAllBets,
  addToBets,
  betAll,
}: {
  setAllBets: (amount: number) => void;
  addToBets: (amount: number) => void;
  betAll: () => void;
}) {
  const [customBet, setCustomBet] = React.useState("");

  return (
    <div className="flex gap-4 justify-start">
      <Button variant="outline" onClick={() => addToBets(10)}>
        + $10
      </Button>
      <Button variant="outline" onClick={() => addToBets(25)}>
        + $25
      </Button>
      <Button variant="outline" onClick={() => addToBets(50)}>
        + $50
      </Button>
      <Button variant="outline" onClick={() => addToBets(100)}>
        + $100
      </Button>

      <Button type="submit" onClick={() => setAllBets(0)}>
        Reset All
      </Button>
      <Button type="submit" onClick={betAll}>
        Bet All
      </Button>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Custom Bet"
        value={customBet}
        onChange={(e) =>
          /^\d*$/.test(e.target.value) && setCustomBet(e.target.value)
        }
        className="bg-zinc-200 rounded-lg px-4 py-2 text-md w-48 ml-auto"
      />
      <Button
        type="submit"
        onClick={() => setAllBets(customBet ? parseInt(customBet) : 0)}
      >
        Set All Bets
      </Button>
    </div>
  );
}
