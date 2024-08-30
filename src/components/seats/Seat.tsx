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
        `transition bg-zinc-200 rounded-lg h-full flex flex-col items-center justify-center text-center text-lg shadow-lg overflow-hidden p-4`,
        className
      )}
    >
      {children}
    </div>
  );
}
