import { CardType } from "@/utils/schema";
import { Card } from "@/components/Card";
import React from "react";

export function CardStack({ cards }: { cards: CardType[] }) {
  const boundingRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(2);
  const [height, setHeight] = React.useState(2);
  const [xoffset, setXOffset] = React.useState(0);
  const [yoffset, setYOffset] = React.useState(0);

  const resize = React.useCallback(() => {
    if (!boundingRef.current) return;

    const bounding = boundingRef.current.getBoundingClientRect();
    const width = bounding.width;
    const height = bounding.height;
    const aspect = width / height;

    // wider than the card, so height is the constraint, i.e. pick width such that height remains okay
    if (aspect > 5 / 7) {
      const w_enforce_overlap = 1 / (1 + (cards.length - 1) * 0.2);
      const w_max = 5 / 7 / aspect;

      const w = Math.min(w_enforce_overlap, w_max);
      const h = w * (7 / 5) * aspect;
      setWidth(w);
      setHeight(h);
      setXOffset((1 - w) / (cards.length - 1));
      setYOffset((1 - h) / (cards.length - 1));
    } // taller than the card, so width is the constraint, i.e. pick height such that width remains okay
    else {
      const h_enforce_overlap = 1 / (1 + (cards.length - 1) * 0.2);
      const h_max = (7 / 5) * aspect;

      const h = Math.min(h_enforce_overlap, h_max);
      const w = (h * (5 / 7)) / aspect;
      setWidth(w);
      setHeight(h);
      setXOffset((1 - w) / (cards.length - 1));
      setYOffset((1 - h) / (cards.length - 1));
    }
  }, [cards.length]);

  React.useLayoutEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return (
    <div className="flex-1 w-full h-full p-4">
      <div className="w-full h-full relative" ref={boundingRef}>
        {cards.map((c, i) => (
          <Card
            key={i}
            className={`absolute transition-[top] transition-[right]`}
            style={{
              width: `${width * 100}%`,
              top: `${100 - height * 100 - yoffset * 100 * i}%`,
              right: `${100 - width * 100 - xoffset * 100 * i}%`,
            }}
            rank={c.rank}
          />
        ))}
      </div>
    </div>
  );
}
