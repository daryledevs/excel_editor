import { createSlice } from "@reduxjs/toolkit"

const initialState: Array<any> = [
  
];

const uploadFilesSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    getUpload: (state, action) => {
      return [...state, action.payload];
    }
  },
});

export const { getUpload } = uploadFilesSlice.actions;
export default uploadFilesSlice.reducer;
