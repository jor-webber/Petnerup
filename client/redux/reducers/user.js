const initialState = {
  currentUser: null,
  allUsers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        ...state,
        currentUser: action.currentUser
      };
    case 'FETCH_ALL_USERS':
      return {
        ...state,
        allUsers: action.allUsers
      }
    default:
      return state;
  }
}


export default userReducer;