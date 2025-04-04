import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  multiplier: number;
  lastUpdated: string;
}

const initialState: CounterState = {
  value: 0,
  multiplier: 1,
  lastUpdated: new Date().toISOString(),
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.lastUpdated = new Date().toISOString();
    },
    decrement: (state) => {
      state.value -= 1;
      state.lastUpdated = new Date().toISOString();
    },
    setMultiplier: (state, action: PayloadAction<number>) => {
      state.multiplier = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { increment, decrement, setMultiplier } = counterSlice.actions;
export default counterSlice.reducer;
