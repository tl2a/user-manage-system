import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  value: [
    {
      "userId": "6ddca37b",
      "firstName": "John",
      "lastName": "Appleseed",
      "userGroup": "Operator",
      "userAuthorizations": [
        {
          "authorizationKey": "jumping",
          "granted": true
        },
        {
          "authorizationKey": "standing",
          "granted": true
        },
        {
          "authorizationKey": "sitting",
          "granted": true
        },
        {
          "authorizationKey": "running",
          "granted": false
        }
      ]
    },
    {
      "userId": "cc07b3c3",
      "firstName": "Janet",
      "lastName": "Williams",
      "userGroup": "Administrator",
      "userAuthorizations": [
        {
          "authorizationKey": "jumping",
          "granted": true
        },
        {
          "authorizationKey": "standing",
          "granted": true
        },
        {
          "authorizationKey": "sitting",
          "granted": true
        },
        {
          "authorizationKey": "running",
          "granted": false
        }
      ]
    }
],
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