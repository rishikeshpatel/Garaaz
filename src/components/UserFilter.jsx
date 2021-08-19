import SearchBar from './SearchBar';
import UserList from './UserList';

function UserFilter(props) {
  const { searchQuery, handleSearch, data, selectionList, onMouseMove, clearSearch } = props;
  return (
    <div className='user-filter'>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} clearSearch={clearSearch} />
      <UserList userList={data} searchQuery={searchQuery} selectionList={selectionList} onMouseMove={onMouseMove} />
    </div>
  );
}
export default UserFilter;
