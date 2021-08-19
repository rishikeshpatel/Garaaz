import List from './List';
import NoResultCard from './NoResultCard';

function UserList(props) {
  const { userList, searchQuery, selectionList, onMouseMove } = props;
  return (
    <div className='user-list' id={'user-list'} onMouseLeave={() => props.onMouseMove(0)}>
      {!userList.length && searchQuery.length > 2 ? (
        <NoResultCard noResult={'No User Found'} />
      ) : (
        userList.map((data, index) => {
          return (
            <List
              data={data}
              searchQuery={searchQuery}
              key={index}
              selectionList={selectionList}
              onMouseMove={onMouseMove}
            />
          );
        })
      )}
    </div>
  );
}
export default UserList;
