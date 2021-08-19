import List from './List';
import NoResultCard from './NoResultCard';
import { appConstant } from '../healper';
function UserList(props) {
  const { userList, searchQuery, selectionList, onMouseMove } = props;
  return (
    <div className='user-list' id={'user-list'} onMouseLeave={() => props.onMouseMove(0)}>
      {!userList.length && searchQuery.length > 2 ? (
        <NoResultCard noResult={appConstant.NO_USER_FOUND} />
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
