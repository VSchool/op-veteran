import { createSlice } from '@reduxjs/toolkit'
import {
  Auth,
  googleSignIn,
  emailSignIn,
  emailSignup,
  signOut,
} from '../Firebase'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: null,
    authError: null,
  },
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload
    },
    setAuthError(state, action) {
      state.authError = action.payload
    },
    resetAuthError(state) {
      state.authError = null
    },
    logout(state) {
      state.auth = null
    },
  },
})

export const { setAuth, setAuthError, resetAuthError, logout } =
  authSlice.actions

export const signInWithGoogle = () => async (dispatch) => {
  dispatch(resetAuthError())
  try {
    await googleSignIn()
  } catch (error) {
    dispatch(setAuthError(error.message))
  }
}

export const signInWithEmail = (email, password) => async (dispatch) => {
  dispatch(resetAuthError())
  try {
    await emailSignIn(email, password)
  } catch (error) {
    dispatch(setAuthError(error.message))
  }
}

export const signUpWithEmail = (email, password) => async (dispatch) => {
  dispatch(resetAuthError())
  try {
    await emailSignup(email, password)
  } catch (error) {
    dispatch(setAuthError(error.message))
  }
}

export const signOutUser = () => async (dispatch) => {
  try {
    await signOut()
    dispatch(logout())
  } catch (error) {
    dispatch(setAuthError(error.message))
  }
}

export const initializeAuth = () => (dispatch) => {
  Auth.onAuthStateChanged((user) => {
    if (user) {
      if (!user.emailVerified) {
        Auth.signOut()
      } else {
        dispatch(setAuth(user))
      }
    }
  })
}

export default authSlice.reducer
