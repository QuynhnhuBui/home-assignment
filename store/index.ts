import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type Plant = {
  id: string;
  uri: string;
  name: string;
  description: string;
  date: string;
};
type InitialState = {
  plants: Plant[];
};
const initial: InitialState = {
  plants: [],
};

const slice = createSlice({
  name: "plants",
  initialState: initial,

  reducers: {
    addPlant: (state, { payload }) => {
      state.plants.push(payload);
    },
    updatePlant: (state, { payload }) => {
      const index = state.plants.findIndex((plant) => plant.id === payload.id);
      if (index !== -1) {
        state.plants[index] = { ...state.plants[index], ...payload };
      }
    },
  },
});
export const { addPlant, updatePlant } = slice.actions;
export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
  reducer: { plants: slice.reducer },
});
