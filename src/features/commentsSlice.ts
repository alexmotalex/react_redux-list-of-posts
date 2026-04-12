/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {
  createComment,
  getPostComments,
  deleteComment as deleteCommentFromServer,
} from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    return commentsFromServer;
  },
);

export const addComment = createAsyncThunk<
  Comment,
  CommentData & { postId: number }
>('comments/add', async ({ name, email, body, postId }) => {
  const newComment = await createComment({
    name,
    email,
    body,
    postId,
  });

  return newComment;
});

export const deleteComment = createAsyncThunk<number, number>(
  'comments/delete',
  async (commentId: number) => {
    await deleteCommentFromServer(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.items = [];
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export const selectCommentsState = (state: RootState) => state.comments;
