function UserList(props) {
  const { id, name, address, pincode } = props.data;
  const getMatchingString = (param) => {
    const { searchQuery } = props;
    let tempJSX = [];
    let startIndex = param.toLowerCase().indexOf(searchQuery);
    if (startIndex < 0) {
      return (
        <>
          <label>{param}</label>
        </>
      );
    }
    let endIndex = startIndex + searchQuery.length;
    let blueString = param.substring(startIndex, endIndex);
    let startStr = param.substring(0, startIndex < 0 ? 0 : startIndex);
    let endStr = param.substring(endIndex, param.length);
    tempJSX.push(
      <>
        {startStr}
        <span>{blueString}</span>
        {endStr}
      </>
    );
    while (endStr.toLowerCase().indexOf(searchQuery) >= 0) {
      startIndex = endStr.toLowerCase().indexOf(searchQuery);

      endIndex = startIndex + searchQuery.length;
      blueString = endStr.substring(startIndex, endIndex);
      startStr = endStr.substring(0, startIndex - 1);
      endStr = endStr.substring(endIndex, param.length);
      tempJSX.push(
        <>
          {startStr}
          <span>{blueString}</span>
          {endStr}
        </>
      );
    }
    return (
      <>
        <label>{tempJSX}</label>
      </>
    );
  };
  return (
    <div
      className={props.selectionList[id] ? 'list active-list' : 'list'}
      id={id}
      onMouseEnter={() => props.onMouseMove(id)}
    >
      <div className='id'>{getMatchingString(id)}</div>
      <div className='name'>{getMatchingString(name)}</div>
      <div className='address'>
        {getMatchingString(address)},{pincode}
      </div>
    </div>
  );
}
export default UserList;
