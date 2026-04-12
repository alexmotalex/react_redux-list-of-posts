import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, { payload }: PayloadAction<User | null>) => {
      return payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export const selectAuthor = (state: RootState) => state.author;
