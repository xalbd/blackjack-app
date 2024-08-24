import { twMerge } from "tailwind-merge";

export function Seat({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        `transition bg-zinc-200 p-4 rounded-lg h-full flex flex-col items-center justify-center text-center text-lg shadow-lg`,
        className
      )}
    >
      {children}
    </div>
  );
}
