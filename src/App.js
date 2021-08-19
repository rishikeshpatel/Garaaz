import React from 'react';
import './App.css';
import Header from './components/Header';
import UserFilter from './components/UserFilter';
import { user, appConstant } from './healper';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredList: [],
      selectionList: [],
      searchQuery: '',
      timer: 1,
      currentSelection: -1,
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
  }
  // on change of selected search result with arrow key up/down
  arrowKeyPress = (e) => {
    const { selectionList, currentSelection } = this.state;
    let nextId = appConstant.EMPTY_TEXT;
    switch (e) {
      case 40:
        if (!selectionList[currentSelection] || currentSelection === selectionList.length - 1) {
          nextId = Object.keys(selectionList[0])[0];
          this.updateSelectionList(Object.keys(selectionList[0])[0]);
        } else if (currentSelection < selectionList.length - 1) {
          nextId = Object.keys(selectionList[currentSelection + 1])[0];
          this.updateSelectionList(Object.keys(selectionList[currentSelection + 1])[0]);
        }
        break;
      case 38:
        if (!selectionList[currentSelection] || currentSelection === 0) {
          nextId = Object.keys(selectionList[selectionList.length - 1])[0];
          this.updateSelectionList(Object.keys(selectionList[selectionList.length - 1])[0]);
        } else if (currentSelection > 0) {
          nextId = Object.keys(selectionList[currentSelection - 1])[0];
          this.updateSelectionList(Object.keys(selectionList[currentSelection - 1])[0]);
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
    this.updateSelectionList(id);
  };
  // On search of user list
  handleSearch = (e) => {
    const { timer } = this.state;
    let query = e.target.value;
    this.setState({
      searchQuery: query,
    });

    window.clearTimeout(timer);
    if (query.trim().length <= 2) {
      this.setState({
        filteredList: [],
      });
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
    this.setState({
      searchQuery: appConstant.EMPTY_TEXT,
      filteredList: [],
    });
  };
  //  Filter user list based on iput search query
  filteredUserList = (query) => {
    let filteredList = [];
    let selectionList = [];
    user.map((data, index) => {
      let tempStr = data.id + ' ' + data.name + ' ' + data.address;
      if (tempStr.toLowerCase().includes(query.toLowerCase())) {
        selectionList.push({ [data.id]: false });
        return filteredList.push(data);
      }
      return null;
    });
    this.setState({
      filteredList,
      selectionList,
    });
  };
  //  Updated selected list based on mouse/keyboard input
  updateSelectionList = (id) => {
    const { currentSelection } = this.state;
    var tempArray = JSON.parse(JSON.stringify(this.state.selectionList));
    let cs = -1;
    if (currentSelection !== -1 && Object.keys(tempArray[this.state.currentSelection])[0] === id) return;
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
    this.setState({
      selectionList: tempArray,
      currentSelection: cs,
    });
  };
  render() {
    const { filteredList, searchQuery, selectionList } = this.state;
    return (
      <div className='App'>
        <Header title={appConstant.APP_NAME} />
        <UserFilter
          data={filteredList}
          searchQuery={searchQuery}
          selectionList={selectionList}
          clearSearch={this.clearSearch}
          handleSearch={this.handleSearch}
          onMouseMove={this.onMouseMove}
        />
      </div>
    );
  }
}

export default App;
