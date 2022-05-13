import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// Loading Data from Api
let url = 'http://127.0.0.1:3002/';
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

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
  value: [],
}

export const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<any>) => {
      state.value = (state.value).filter(st => st.userId!==action.payload.userId);
      state.value = [...state.value, action.payload];
      axios.post(url, state.value, config)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    addUser: (state, action: PayloadAction<any>) => {
      state.value = [...state.value, action.payload];
      axios.post(url, state.value, config)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    getUser: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, addUser, getUser } = UserSlice.actions

export default UserSlice.reducer