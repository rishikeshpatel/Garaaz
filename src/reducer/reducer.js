import { userFilterActionTypes } from '../action/actionType';
import { users } from '../mocks/user';

const initialState = {
  users: users,
  filteredList: [],
  selectionList: [],
  searchQuery: '',
  currentSelection: -1,
};

function userFilterReducer(state = initialState, action) {
  switch (action.type) {
    case userFilterActionTypes.UPDATE_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case userFilterActionTypes.UPDATE_FILTER_LIST:
      return { ...state, filteredList: action.payload };
    case userFilterActionTypes.UPDATE_SELECTION_LIST:
      return { ...state, selectionList: action.payload };
    case userFilterActionTypes.UPDATE_CURRENT_SELECTION:
      return { ...state, currentSelection: action.payload };
    case userFilterActionTypes.RESET_FILTER:
      return { ...state, filteredList: [], selectionList: [], currentSelection: -1 };
    default:
      return state;
  }
}

export default userFilterReducer;
