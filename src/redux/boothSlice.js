import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '../database'

const boothRef = firestore.collection('Booths')

// Async thunk to fetch booths from Firestore
export const fetchBooths = createAsyncThunk('booths/fetchBooths', async () => {
  const boothArray = []
  const querySnapshot = await boothRef.where('number', '!=', null).get()

  querySnapshot.forEach((doc) => {
    boothArray.push(doc.data())
  })

  return boothArray
})

const boothSlice = createSlice({
  name: 'booths',
  initialState: {
    booths: [],
    rowData: {
      A: { x: 162, y: 399, theta: -20 },
      B: { x: 222, y: 364, theta: -20 },
      // ... other row data as provided in your context
    },
    diagramData: {
      section1: {
        A: { x: 80, y: 98, theta: 0 },
        B: { x: 183, y: 98, theta: 0 },
      },
      section3: {
        A: { x: 80, y: 789, theta: 0 },
        B: { x: 183, y: 789, theta: 0 },
      },
      // ... other diagram data as provided in your context
    },
    statusCodes: {
      OPEN: 0,
      ONHOLD: 1,
      RESERVED: 2,
    },
  },
  reducers: {
    createBooth(state, action) {
      const { row, number, data } = action.payload
      const id = makeId(row, number)
      boothRef.doc(id).set({ ...data })
    },
    updateBooth(state, action) {
      const { id, data } = action.payload
      boothRef.doc(id).update(data)
    },
    resetBooth(state, action) {
      const id = action.payload
      boothRef.doc(id).update({ status: 0, vendor: null })
    },
    reserveBooth(state, action) {
      const { vendor, id } = action.payload
      boothRef.doc(id).update({ vendor, status: 2 })
    },
    holdBooth(state, action) {
      const { vendor, id } = action.payload
      boothRef.doc(id).update({ vendor, status: 1 })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooths.fulfilled, (state, action) => {
      state.booths = action.payload
    })
  },
})

// Utility function to create an ID for a booth
const makeId = (row, number) => {
  let id = row
  if (number < 10) {
    id += '0'
  }
  id += number
  return id
}

export const { createBooth, updateBooth, resetBooth, reserveBooth, holdBooth } =
  boothSlice.actions

export default boothSlice.reducer
