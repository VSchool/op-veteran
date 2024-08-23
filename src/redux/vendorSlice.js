// fake data

import { createSlice } from '@reduxjs/toolkit'

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    vendors: [],
  },
  reducers: {
    setVendors(state, action) {
      state.vendors = action.payload
    },
  },
})

export const { setVendors } = vendorSlice.actions

export default vendorSlice.reducer
