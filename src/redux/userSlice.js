// dummy data

import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAdmin: false,
    isDev: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user
      state.isAdmin = action.payload.isAdmin
      state.isDev = action.payload.isDev
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
