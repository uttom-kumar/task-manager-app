import {createSlice} from "@reduxjs/toolkit"

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    loader: "hidden",
  },
  reducers: {
    ShowLoader: (state) => {
      state.loader = "block";
    },
    HideLoader: (state) => {
      state.loader = "hidden";
    }
  }
})
export const {ShowLoader, HideLoader} = settingsSlice.actions;
export default settingsSlice.reducer;