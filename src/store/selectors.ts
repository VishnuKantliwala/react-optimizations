import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Normal Redux selectors (these will be recalculated every time)
export const selectCounterValue = (state: RootState) => state.counter.value;
export const selectMultiplier = (state: RootState) => state.counter.multiplier;
export const selectLastUpdated = (state: RootState) =>
  state.counter.lastUpdated;

// This will be recalculated every time, even if the inputs haven't changed
export const selectNormalMultipliedValue = (state: RootState) => {
  console.log("Normal selector recalculating...");
  return state.counter.value * state.counter.multiplier;
};

// Simulate a computationally intensive task
const performHeavyCalculation = (value: number): number => {
  console.log("Reselect selector recalculating...");

  // Simulate a complex calculation that takes time
  let result = 0;

  // Increase iterations to make it more noticeable
  for (let i = 0; i < 1000000; i++) {
    // Complex math operations
    result += Math.sin(i) * Math.cos(i) * Math.tan(i);
    result += Math.sqrt(Math.abs(Math.log(Math.abs(value) + 1)));
    result += Math.pow(Math.E, Math.sin(i) * 0.01);
  }

  // Add some delay to make it more noticeable
  const start = performance.now();
  while (performance.now() - start < 100) {
    // Busy wait to simulate processing
  }

  return result + value;
};

// Basic selector that gets the counter value
export const selectCount = (state: RootState) => state.counter.value;

// Reselect selector that multiplies the counter value by 2
export const selectMultipliedValue = createSelector([selectCount], (count) =>
  performHeavyCalculation(count * 2)
);

// Reselect selector that formats the counter value
export const selectFormattedValue = createSelector([selectCount], (count) => {
  const value = performHeavyCalculation(count);
  return {
    value,
    lastUpdated: new Date().toLocaleTimeString(),
    isPositive: value > 0,
  };
});
