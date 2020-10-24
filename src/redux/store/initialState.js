const PER_PAGE = 50;

const initialState = {
  loading: false,
  photos: [],

  searchText: "Mountain",
  openToast: true,
  pagination: {
    size: PER_PAGE,
    total: 1,
    page: 1,
  },
  query: {
    per_page: PER_PAGE,
    page: 1,
  },
};
export default initialState;
