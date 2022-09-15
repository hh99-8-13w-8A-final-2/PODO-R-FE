import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URI = {
    BASE : process.env.REACT_APP_BASE_URI
  }

  const initialState = {
    data : []
  };

  export const __getmusicalData = createAsyncThunk(
    "post/__getmusicalData",
    async(musicalId, thunkAPI) => {
        try{
            const res = await axios.get(`${URI.BASE}/api/musicals/${musicalId}`)
            return thunkAPI.fulfillWithValue(res.data)
        } catch (error){
            return thunkAPI.rejectWithValue(error);
        }
    }
  )

  const musicalSlice = createSlice({
    name: "musical",
    initialState,
    reducers: {},
    extraReducers:{
        [__getmusicalData.fulfilled]:(state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }
    }
  })

  export default musicalSlice.reducer;