import React from 'react';
import './App.css';
import Header from './components/header/Header';
import UserFilter from './components/user-filter/UserFilter';
import { appConstant } from './healper';
import { connect } from 'react-redux';
import {
  getUsers,
  updateSearchQuery,
  updateFilterList,
  updateSelectionList,
  updateCurrentSelection,
  resetFilter,
} from './action/action';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 1,
    };
  }

  // Listening for arrow key event to move up/down search result
  componentDidMount() {
    let context = this;
    document.addEventListener(appConstant.KEYDOWN, function (e) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
        context.arrowKeyPress(e.keyCode);
      }
    });
    // Use below function to get user through API
    // this.props.getUsers()
  }
  // on change of selected search result with arrow key up/down
  arrowKeyPress = (e) => {
    const { selectionList, currentSelection } = this.props;
    let nextId = appConstant.EMPTY_TEXT;
    switch (e) {
      case 40:
        if (!selectionList[currentSelection] || currentSelection === selectionList.length - 1) {
          nextId = Object.keys(selectionList[0])[0];
          this.updateSelection(Object.keys(selectionList[0])[0]);
        } else if (currentSelection < selectionList.length - 1) {
          nextId = Object.keys(selectionList[currentSelection + 1])[0];
          this.updateSelection(Object.keys(selectionList[currentSelection + 1])[0]);
        }
        break;
      case 38:
        if (!selectionList[currentSelection] || currentSelection === 0) {
          nextId = Object.keys(selectionList[selectionList.length - 1])[0];
          this.updateSelection(Object.keys(selectionList[selectionList.length - 1])[0]);
        } else if (currentSelection > 0) {
          nextId = Object.keys(selectionList[currentSelection - 1])[0];
          this.updateSelection(Object.keys(selectionList[currentSelection - 1])[0]);
        }
        break;
      default:
        break;
    }
    this.updateScrollPosition(nextId);
  };
  // Keeping selected list in view
  updateScrollPosition = (id) => {
    let elmnt = document.getElementById(id);
    elmnt.scrollIntoView();
  };
  // When mouse moves on search list, updating list selection
  onMouseMove = (id) => {
    this.updateSelection(id);
  };
  // On search of user list
  handleSearch = (e) => {
    const { timer } = this.state;
    const { updateSearchQuery, resetFilter } = this.props;
    let query = e.target.value;
    updateSearchQuery(query);
    window.clearTimeout(timer);
    if (query.trim().length <= 2) {
      resetFilter();
    }
    this.setState({
      timer: setTimeout(() => {
        if (query.trim().length > 2) {
          this.filteredUserList(query.trim());
        }
      }, 500),
    });
  };
  // Clear the search query
  clearSearch = () => {
    const { updateSearchQuery, resetFilter } = this.props;
    updateSearchQuery(appConstant.EMPTY_TEXT);
    resetFilter();
  };
  //  Filter user list based on iput search query
  filteredUserList = (query) => {
    const { users, updateFilterList, updateSelectionList } = this.props;
    let filteredList = [];
    let selectionList = [];
    users.map((data, index) => {
      let tempStr = data.id + ' ' + data.name + ' ' + data.address;
      if (tempStr.toLowerCase().includes(query.toLowerCase())) {
        selectionList.push({ [data.id]: false });
        return filteredList.push(data);
      }
      return null;
    });
    updateFilterList(filteredList);
    updateSelectionList(selectionList);
  };
  //  Updated selected list based on mouse/keyboard input
  updateSelection = (id) => {
    const { currentSelection, updateSelectionList, updateCurrentSelection, selectionList } = this.props;
    var tempArray = JSON.parse(JSON.stringify(selectionList));
    let cs = -1;
    if (currentSelection !== -1 && Object.keys(tempArray[currentSelection])[0] === id) return;
    if (!id) {
      tempArray.map((key) => {
        let element = document.getElementById(Object.keys(key)[0]);
        tempArray[Object.keys(key)[0]] = false;
        element.className = 'list';
        return null;
      });
    } else {
      tempArray.map((key, index) => {
        let element = document.getElementById(id);
        if (Object.keys(key)[0] === id) {
          tempArray[Object.keys(key)[0]] = true;
          cs = index;
          element.className = 'list active-list';
        } else {
          tempArray[Object.keys(key)[0]] = false;
          element.className = 'list';
        }
        return null;
      });
    }
    updateSelectionList(tempArray);
    updateCurrentSelection(cs);
  };
  render() {
    return (
      <div className='App'>
        <Header title={appConstant.APP_NAME} />
        <UserFilter clearSearch={this.clearSearch} handleSearch={this.handleSearch} onMouseMove={this.onMouseMove} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  updateSearchQuery: (searchQuery) => dispatch(updateSearchQuery(searchQuery)),
  updateFilterList: (userList) => dispatch(updateFilterList(userList)),
  updateSelectionList: (selectionList) => dispatch(updateSelectionList(selectionList)),
  updateCurrentSelection: (id) => dispatch(updateCurrentSelection(id)),
  resetFilter: () => dispatch(resetFilter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
