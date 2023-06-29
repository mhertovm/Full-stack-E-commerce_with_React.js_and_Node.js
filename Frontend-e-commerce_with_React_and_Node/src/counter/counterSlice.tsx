import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    search: string,
    updateProductTable: boolean,
    updateCategoryTable: boolean,
    updateNavbarTable: boolean,
    updateShCartTable: boolean,

}

const initialState: CounterState = {
    search: "",
    updateProductTable: false,
    updateCategoryTable: false,
    updateNavbarTable : false,
    updateShCartTable: false,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setUpdateProductTable: (state, action: PayloadAction<boolean>)=> {
      state.updateProductTable = action.payload
    },
    setUpdateCategoryTable: (state, action: PayloadAction<boolean>)=> {
      state.updateCategoryTable = action.payload
    },
    setUpdateNavbarTable: (state, action: PayloadAction<boolean>)=> {
      state.updateNavbarTable = action.payload
    },
    setUpdateShCartTable: (state, action: PayloadAction<boolean>)=> {
      state.updateShCartTable = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearchInput, setUpdateProductTable, setUpdateCategoryTable, setUpdateNavbarTable, setUpdateShCartTable} = counterSlice.actions

export default counterSlice.reducer