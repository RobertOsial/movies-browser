import { createSlice } from "@reduxjs/toolkit";

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    movieDetails: [],
    loading: false,
    error: false,
  },

  reducers: {
    fetchMovieDetails: (state) => {
      state.loading = true;
    },

    fetchMovieDetailsSuccess: (state, { payload: movies }) => {
      state.loading = false;
      state.error = false;
      state.movieDetails = movies.results;
    },

    fetchMovieDetailsError: (state) => {
      state.error = true;
    },
  },
});

export const {
  fetchMovieDetails,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsError } = movieDetailsSlice.actions;

const selectMovieDetails = (state) => state.movieDetails;

export const selectMovies = state => selectMovieDetails(state).movieDetails;
export const selectLoading = state => selectMovieDetails(state).loading;
export const selectError = state => selectMovieDetails(state).error;

export const movieDetailsReducer = movieDetailsSlice.reducer;
