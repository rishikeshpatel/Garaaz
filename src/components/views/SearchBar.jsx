import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import { appConstant } from '../../healper';
function SearchBar(props) {
  const { handleSearch, clearSearch } = props;
  const searchQuery = useSelector((state) => state.searchQuery);
  // Disable keyboard event of arrow key up/down, *to be used for list selection
  useEffect(() => {
    document.getElementById('search-input').addEventListener('keydown', function (e) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
      }
    });
  });
  return (
    <div className='user-search'>
      <div className='search-box'>
        <div className='search-icon'>
          <FaSearch />
        </div>
        <input
          id={'search-input'}
          type='text'
          value={searchQuery}
          placeholder={appConstant.SEARCH_PLACEHOLDER}
          onChange={(e) => handleSearch(e)}
        />
        <div className='clear-search'>
          <MdClear onClick={() => clearSearch()} />
        </div>
      </div>
    </div>
  );
}
export default SearchBar;
