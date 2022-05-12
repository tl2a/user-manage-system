import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Loading Data from JSON
import db from './DB/user-data.json';

export interface UserState {
  value: {
    "userId": string,
    "firstName": string,
    "lastName": string,
    "userGroup": string,
    "userAuthorizations":
    {
      "authorizationKey": string,
      "granted": boolean
    }[]
  }[]
}

const initialState: UserState = {
  value: db,
}

export const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<any>) => {
      state.value = (state.value).filter(st => st.userId!==action.payload.userId);
      state.value = [...state.value, action.payload];
    },
    addUser: (state, action: PayloadAction<any>) => {
      state.value = [...state.value, action.payload];
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, addUser } = UserSlice.actions

export default UserSlice.reducer