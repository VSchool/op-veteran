import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  scale: { x: 1, y: 1 },
  stageSize: { w: 1024, h: 1083 },
  currentSection: '',
  currentRow: '',
  currentBooth: null,
}

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setScale(state, action) {
      state.scale = action.payload
    },
    setStageSize(state, action) {
      state.stageSize = action.payload
    },
    setCurrentSection(state, action) {
      state.currentSection = action.payload
    },
    setCurrentRow(state, action) {
      state.currentRow = action.payload
    },
    setCurrentBooth(state, action) {
      state.currentBooth = action.payload
    },
    enterDiagramMode(state) {
      state.stageSize = { w: 700, h: 700 }
    },
    enterMapMode(state) {
      state.stageSize = { w: 1024, h: 1083 }
    },
    fitStageIntoParentContainer(state, action) {
      const { containerWidth, stageSizeWidth } = action.payload
      const scaleAmount = Math.min(
        Math.max(containerWidth / stageSizeWidth, 0),
        1
      )
      state.scale = { x: scaleAmount, y: scaleAmount }
    },
  },
})

export const {
  setScale,
  setStageSize,
  setCurrentSection,
  setCurrentRow,
  setCurrentBooth,
  enterDiagramMode,
  enterMapMode,
  fitStageIntoParentContainer,
} = canvasSlice.actions

export default canvasSlice.reducer
