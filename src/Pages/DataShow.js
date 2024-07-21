import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';

const DataShow = () => {
  const [list, setList] = useState();
  const [search, setSearch] = useState('');
  const [short, setShort] = useState({ heading: '', order: '' });

  useEffect(() => {
    getDate();
  }, []);

  const getDate = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((result) => {
        if (result.status == 200) {
          setList(result.data);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleCheck = (value, index) => {
    const newArray = [...list];
    let toggle = !value;
    newArray[index].completed = toggle;
    setList(newArray);
  };

  const handleSearch = (val) => {
    setSearch(val);
  };

  const formatedData = useMemo(() => {
    const data = list?.filter((item) => {
      let filterTitle =
        search != '' ? item.title?.includes(search) : true;
      return filterTitle;
    });
    short.heading == 'id' &&
      data.sort((a, b) => (short.order ? a.id - b.id : b.id - a.id));
    short.heading == 'title' &&
      data.sort((a, b) =>
        short.order
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
    return data;
  }, [search, list, short]);

  const status = useMemo(() => {
    const obj = { completed: 0, notComplted: 0 };
    obj.completed = formatedData?.filter(
      (item) => (item = item.completed == true)
    )?.length;
    obj.notComplted = formatedData?.length - obj.completed;
    return obj;
  }, [formatedData]);

  const handleSort = (val) => {
    setShort(val);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        Data list
        {`completedTask:${status.completed}  notComplted:${status.notComplted}`}
      </h1>
      <div className="center-search">
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <table
        border={'1px solid black'}
        cellPadding={'6px'}
        style={{ margin: '0px auto' }}
      >
        <thead>
          <th
            onClick={() =>
              handleSort(
                short.heading == 'id'
                  ? { heading: 'id', order: !short.order }
                  : { heading: 'id', order: true }
              )
            }
          >
            id
          </th>
          <th
            onClick={() =>
              handleSort(
                short.heading == 'title'
                  ? { heading: 'title', order: !short.order }
                  : { heading: 'title', order: true }
              )
            }
          >
            title
          </th>
          <th>Status</th>
        </thead>
        <tbody>
          {formatedData?.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onClick={() => handleCheck(item.completed, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataShow;
