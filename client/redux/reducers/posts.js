const initialState = {
  allPosts: []
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return {
        ...state,
        allPosts: action.allPosts
      };
    default:
      return state;
  }
}

export default postReducer;