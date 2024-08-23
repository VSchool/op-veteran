import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firestore, { createUser, checkPermissions } from '../database'

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (auth, { dispatch }) => {
    const userRef = firestore.doc(`Users/${auth.email}`)

    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      await createUser(auth)
      const newUserDoc = await userRef.get()
      return newUserDoc.data()
    } else {
      return userDoc.data()
    }
  }
)

export const fetchPermissions = createAsyncThunk(
  'user/fetchPermissions',
  async (uid) => {
    const permissions = await checkPermissions(uid)
    return permissions
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAdmin: false,
    isDev: false,
  },
  reducers: {
    updateUser(state, action) {
      const userRef = firestore.doc(`Users/${state.user.email}`)
      userRef.update(action.payload).catch((err) => console.error(err))
      state.user = { ...state.user, ...action.payload }
    },
    reserveBooth(state, action) {
      const userRef = firestore.doc(`Users/${state.user.email}`)
      userRef
        .update({ reservation: action.payload })
        .catch((err) => console.error(err))
      state.user = { ...state.user, reservation: action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.isAdmin = action.payload.isAdmin
        state.isDev = action.payload.isDev
      })
  },
})

export const { updateUser, reserveBooth } = userSlice.actions

export default userSlice.reducer
