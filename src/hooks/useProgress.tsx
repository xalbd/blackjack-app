import React from "react";

export function useProgress(received: number, duration: number) {
  const requestRef = React.useRef<number | null>(null);
  const [progressValue, setProgressValue] = React.useState(0);

  const animateProgress = React.useCallback(() => {
    const now = Date.now();
    if (received + duration * 1000 >= now) {
      setProgressValue(100 * ((now - received) / (duration * 1000)));
      requestRef.current = requestAnimationFrame(animateProgress);
    }
  }, [duration, received]);

  React.useEffect(() => {
    if (progressValue < 100) {
      requestRef.current = requestAnimationFrame(animateProgress);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateProgress, progressValue]);

  return { progressValue };
}
