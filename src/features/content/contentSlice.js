import { createSlice } from '@reduxjs/toolkit';

export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    ready: false,
    lastUpdate: null,
    articles: []
  },
  reducers: {
    checkLocalStorage: state => {
        //Check local storage for content. If none is found, fetchNew. If content is found, check if it is out of date according to the CMS. If it is not out of date, set ready to true.
    },
    fetchNew: state => {
        //Fetch content from CMS. Once done, persist in local storage, and set ready to true
    }
  },
});

export const { checkLocalStorage, fetchNew } = contentSlice.actions;

export const selectIsContentReady = state => state.content.ready;
export const selectArticles = state => state.counter.articles;


export default contentSlice.reducer;
