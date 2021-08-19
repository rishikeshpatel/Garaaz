import SearchBar from './SearchBar';
import UserList from './UserList';

function UserFilter(props) {
  const { handleSearch, onMouseMove, clearSearch } = props;
  return (
    <div className='user-filter'>
      <SearchBar handleSearch={handleSearch} clearSearch={clearSearch} />
      <UserList onMouseMove={onMouseMove} />
    </div>
  );
}
export default UserFilter;
