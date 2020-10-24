import { LOADING, ADD_PHOTOS } from "./actionTypes";
export const loading = (isLoading) => ({
  type: LOADING,
  payload: {loading: isLoading},
});
export const addPhotos = (photos) => ({
  type: ADD_PHOTOS,
  payload: photos,
});
