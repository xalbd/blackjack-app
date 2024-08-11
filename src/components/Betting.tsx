import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React from "react";

export function Betting({
  setAllBets,
  addToBets,
}: {
  setAllBets: (amount: number) => void;
  addToBets: (amount: number) => void;
}) {
  const [customBet, setCustomBet] = React.useState("");

  return (
    <div className="flex gap-4">
      <Button variant="secondary" onClick={() => addToBets(10)}>
        + $10
      </Button>
      <Button variant="secondary" onClick={() => addToBets(25)}>
        + $25
      </Button>
      <Button variant="secondary" onClick={() => addToBets(50)}>
        + $50
      </Button>
      <Button variant="secondary" onClick={() => addToBets(100)}>
        + $100
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
        className="bg-[#f0f0f0] rounded-lg px-4 py-2 text-md"
      />
      <Button
        type="submit"
        onClick={() => setAllBets(customBet ? parseInt(customBet) : 0)}
      >
        Custom
      </Button>
    </div>
  );
}
