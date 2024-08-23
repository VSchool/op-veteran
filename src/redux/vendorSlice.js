import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '../database'
import { Storage } from '../Firebase'

const vendorRef = firestore.collection('vendors')

// Thunk to match a vendor based on the user's email
export const matchVendor = createAsyncThunk(
  'vendor/matchVendor',
  async (userEmail) => {
    const querySnapshot = await vendorRef
      .where('repEmail', '==', userEmail)
      .get()
    let matchedVendor = null

    querySnapshot.forEach((doc) => {
      matchedVendor = doc.data()
    })

    return matchedVendor
  }
)

// Thunk to create a new vendor
export const createVendor = createAsyncThunk(
  'vendor/createVendor',
  async (data) => {
    const vendorData = {
      ...data,
      rep: `${data.firstName} ${data.lastName}`,
      booth: {
        primary: {
          id: null,
          status: 0,
        },
        secondary: {
          id: null,
          status: 0,
        },
      },
    }

    await vendorRef.doc(data.organization).set(vendorData)
    return vendorData
  }
)

// Thunk to update an existing vendor
export const updateVendor = createAsyncThunk(
  'vendor/updateVendor',
  async ({ apt, city, state, street, zip, ...data }, { getState }) => {
    const { currentVendor } = getState().vendor

    const updatedVendor = {
      ...currentVendor,
      ...data,
      address: {
        apt,
        city,
        state,
        street,
        zip,
      },
      rep: `${data.firstName} ${data.lastName}`,
    }

    await vendorRef.doc(currentVendor.organization).update(updatedVendor)

    return updatedVendor
  }
)

// Thunk to store a file in Firebase Storage
export const storeFile = createAsyncThunk(
  'vendor/storeFile',
  async ({ file, path }, { getState }) => {
    const { currentVendor } = getState().vendor
    const storageRef = Storage.ref(path)

    await storageRef.put(file)
    const url = await storageRef.getDownloadURL()

    await vendorRef.doc(currentVendor.organization).update({
      logoUrl: url,
      logoFileName: file.name,
    })

    return {
      logoUrl: url,
      logoFileName: file.name,
    }
  }
)

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    currentVendor: null,
    primaryMode: true,
  },
  reducers: {
    setPrimaryMode(state, action) {
      state.primaryMode = action.payload
    },
    saveCurrentVendor(state, action) {
      state.currentVendor = action.payload
      localStorage.setItem('currentVendor', JSON.stringify(action.payload))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(matchVendor.fulfilled, (state, action) => {
        state.currentVendor = action.payload
        if (action.payload) {
          localStorage.setItem('currentVendor', JSON.stringify(action.payload))
        }
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.currentVendor = action.payload
        localStorage.setItem('currentVendor', JSON.stringify(action.payload))
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.currentVendor = action.payload
        localStorage.setItem('currentVendor', JSON.stringify(action.payload))
      })
      .addCase(storeFile.fulfilled, (state, action) => {
        state.currentVendor = {
          ...state.currentVendor,
          logoUrl: action.payload.logoUrl,
          logoFileName: action.payload.logoFileName,
        }
        localStorage.setItem(
          'currentVendor',
          JSON.stringify(state.currentVendor)
        )
      })
  },
})

export const { setPrimaryMode, saveCurrentVendor } = vendorSlice.actions

export default vendorSlice.reducer
