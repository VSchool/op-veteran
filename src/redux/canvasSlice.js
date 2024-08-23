// fake data

import { createSlice } from '@reduxjs/toolkit'

const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    canvasState: null,
  },
  reducers: {
    setCanvasState(state, action) {
      state.canvasState = action.payload
    },
  },
})

export const { setCanvasState } = canvasSlice.actions

export default canvasSlice.reducer
