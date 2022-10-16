export const postState = [];

export const POST_ACTIONS = {
  FETCH_POSTS: "FETCH_POSTS",
  ADD_POST: "ADD_POST",
  DELETE_POST: "DELETE_POST",
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case POST_ACTIONS.FETCH_POSTS:
      return action.payload;

    case POST_ACTIONS.ADD_POST:
      return [...state, action.payload];

    case POST_ACTIONS.DELETE_POST:
      return state.filter((item) => item.id !== action.payload);
      
    default:
      return state;
  }
};
