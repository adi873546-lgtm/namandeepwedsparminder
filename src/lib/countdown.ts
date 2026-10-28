export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True when the target date has passed. */
  passed: boolean;
}

/**
 * Time remaining until `targetISO`, computed at `nowMs`.
 * Target strings carry their own UTC offset (IST for this wedding),
 * so the arithmetic is timezone-safe.
 */
export function getTimeRemaining(targetISO: string, nowMs: number): TimeRemaining {
  const target = new Date(targetISO).getTime();
  const diff = target - nowMs;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    passed: false,
  };
}
