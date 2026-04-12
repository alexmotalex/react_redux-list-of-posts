import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { RootState } from '../app/store';

const initialState: User[] = [];

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const res = await getUsers();

  return res;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export const selectUsers = (state: RootState) => state.users;
