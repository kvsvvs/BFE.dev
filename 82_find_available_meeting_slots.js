function findMeetingSlots(schedules) {
  const DAY_START = 0;
  const DAY_END = 24;

  let allBusyIntervals = [];
  for (const memberSchedule of schedules) {
    allBusyIntervals.push(...memberSchedule);
  }

  const mergedBusyIntervals = mergeIntervals(allBusyIntervals);

  const freeSlots = [];
  let previousEnd = DAY_START;

  for (const [start, end] of mergedBusyIntervals) {
    if (start > previousEnd) {
      freeSlots.push([previousEnd, start]);
    }
    previousEnd = Math.max(previousEnd, end);
  }

  if (previousEnd < DAY_END) {
    freeSlots.push([previousEnd, DAY_END]);
  }

  return freeSlots;
}

function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const merged = [];
  let current = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const [currentStart, currentEnd] = current;
    const [nextStart, nextEnd] = intervals[i];

    if (currentEnd >= nextStart) {
      current = [currentStart, Math.max(currentEnd, nextEnd)];
    } else {
      merged.push(current);
      current = intervals[i];
    }
  }

  merged.push(current);

  return merged;
}

// Example usage
const schedules = [
  [
    [13, 15],
    [11, 12],
    [10, 13],
  ], // schedule for member 1
  [[8, 9]], // schedule for member 2
  [[13, 18]], // schedule for member 3
];

console.log(findMeetingSlots(schedules));
