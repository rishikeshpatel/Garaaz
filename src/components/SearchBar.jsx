import React, { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
function SearchBar(props) {
  const { searchQuery, handleSearch, clearSearch } = props;

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
          placeholder='Search user by ID, address, name'
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
