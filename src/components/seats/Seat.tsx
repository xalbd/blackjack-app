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
        `bg-[#f0f0f0] p-4 rounded-lg flex-1 h-full flex flex-col items-center justify-center text-center text-lg`,
        className
      )}
    >
      {children}
    </div>
  );
}
