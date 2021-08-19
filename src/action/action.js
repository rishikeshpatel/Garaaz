import { userFilterActionTypes } from './actionType';
// import axios from 'axios';

export const getUsers = () => {
  return (dispatch) => {
    // Axios call can be made here to get users data
  };
};

export const updateSearchQuery = (query) => ({
  type: userFilterActionTypes.UPDATE_SEARCH_QUERY,
  payload: query,
});
export const updateFilterList = (userList) => ({
  type: userFilterActionTypes.UPDATE_FILTER_LIST,
  payload: userList,
});
export const updateSelectionList = (selectionList) => ({
  type: userFilterActionTypes.UPDATE_SELECTION_LIST,
  payload: selectionList,
});
export const updateCurrentSelection = (id) => ({
  type: userFilterActionTypes.UPDATE_CURRENT_SELECTION,
  payload: id,
});
export const resetFilter = () => ({
  type: userFilterActionTypes.RESET_FILTER,
  payload: {},
});
