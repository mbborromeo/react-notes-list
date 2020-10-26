import React, {
  useState, useEffect, useCallback //, useMemo
} from 'react';
import { Link } from 'react-router-dom';
//import DataService from '../../services/DataService';
import AddForm from './AddForm/AddForm';
import './List.css';

function List() {
  const [list, setList] = useState( [] );

  //const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  //const [hasError, setHasError] = useState(false);

  // save a memoized copy of the function for re-use instead of creating a new function each time
  /*
  const dataService = useMemo(
    () => new DataService(),
    []
  );
  */

  const getArrayIndexOfItem = useCallback(
    (id) => {
      const isItemOfInterest = (element) => element.id === id;
      return list.findIndex(isItemOfInterest);
    },
    [list]
  );

  // Reference: https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks
  const completeToDo = useCallback(
    (id) => {
      const indexOfItem = getArrayIndexOfItem(id);
      const copyOfList = [...list];

      if (!copyOfList[indexOfItem].completed) {
        copyOfList[indexOfItem].completed = true;
      } else {
        copyOfList[indexOfItem].completed = false;
      }

      setList(copyOfList);
    },
    [list, getArrayIndexOfItem] // dependencies that require a re-render for
  );

  const deleteToDo = useCallback(
    (id) => {
      //const indexOfItem = getArrayIndexOfItem(id);
      // const copyOfList = [...list];
      // copyOfList.splice(indexOfItem, 1);
      const filteredList = list.filter((elem) => elem.id !== id);

      setList(filteredList); // copyOfList
    },
    [list] // dependencies that require a re-render for //, getArrayIndexOfItem
  );

  // Reference: https://www.danvega.dev/blog/2019/03/14/find-max-array-objects-javascript
  const getMaxID = useCallback(
    () => {
      const ids = list.map((item) => item.id);
      const sorted = ids.sort((a, b) => a - b); // sort ascending order
      return sorted[sorted.length - 1] || 0; // find max ID, else start at 1 (0)
    },
    [list]
  );

  const addToDo = useCallback(
    (text) => {
      const newListItem = {
        id: getMaxID() + 1,
        completed: false,
        title: text
      };

      const newList = [...list, newListItem]; // add new item to end of list
      setList(newList);
    },
    [list, getMaxID]
  );

  /*
    const editToDo = (index, text) => {
        const copyOfList = [...list];
        copyOfList[index].title = text;
        setList(copyOfList);
    };
    */

  // Reference: https://www.smashingmagazine.com/2020/03/sortable-tables-react/
  /*
  const requestSort = useCallback(
    (key) => {
      let direction;

      // if requested key is same as current key
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else {
        direction = 'ascending'; // by default
      }

      // set to new key and direction
      setSortConfig({ key, direction });
    },
    [sortConfig] // dependencies that require a re-render for
  );  
  */

  /*
  useEffect(() => {
    dataService.getList()
      .then((response) => {
        // handle success
        setList(response);
      })
      .catch((error) => {
        // handle error
        console.error('axios.jsonp CATCH', error);
        setHasError(true);
      })
      .finally(() => {
        // always executed
      });
  },
  [dataService]);
  */

  // Reference: https://dev.to/saranshk/react-hooks-and-local-storage-let-s-build-a-todo-app-39g3
  // empty array dependency so effect only runs once initially
  useEffect(() => {
    const localList = JSON.parse( localStorage.getItem('localList') );

    if (localList) {
      setList( localList );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem( 'localList', JSON.stringify( list ) );
  }, [list]);

  // sort list
  /*
  const sortedResults = useMemo(
    () => {
      if (list) {
        const sortedList = [...list];

        sortedList.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            if (sortConfig.key === 'completed') { // completed has reversed order
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            if (sortConfig.key === 'completed') { // completed has reversed order
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }

          // then sort by ID as well
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }

          return 0;
        });

        return sortedList;
      }
      return undefined;
    },
    [list, sortConfig]
  );
  */
  
  // possibly use useMemo here, and/or define a function for sort
  // if (sortedResults) {
  //   if (sortedResults.length > 0) {
  if (list) {    
    console.log("list.length", list.length)
    console.log("list", list)
    console.log("typeof list", typeof list)
    // render DOM
    return (
      <div>
        <div id="header">
          <h1>Notes List</h1>
          <AddForm addFunction={addToDo} />
        </div>

        { list.length > 0 &&
        <table>
          <thead>
            <tr>
              <th>
                {/* <button
                  type="button"
                  className={sortConfig.key === 'id' ? sortConfig.direction : ''}
                  onClick={() => requestSort('id')}
                > */}
                  ID
                {/* </button> */}
              </th>
              <th>
                {/* <button
                  type="button"
                  className={sortConfig.key === 'title' ? sortConfig.direction : ''}
                  onClick={() => requestSort('title')}
                > */}
                  Title
                {/* </button> */}
              </th>
              <th>
                {/* <button
                  type="button"
                  id="completed"
                  className={sortConfig.key === 'completed' ? sortConfig.direction : ''}
                  onClick={() => requestSort('completed')}
                > */}
                  Completed
                {/* </button> */}
              </th>
            </tr>
          </thead>

          <tbody>
            {
              // sortedResults.map((item) => (
              list.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link
                      to={`/detail/${item.id}`}
                      data-id={item.id}
                      className={item.completed ? 'completed' : ''}
                    >
                      { item.id }
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/detail/${item.id}`}
                      data-id={item.id}
                      className={item.completed ? 'completed' : ''}
                    >
                      { item.title }
                    </Link>
                  </td>
                  <td>
                    <button type="button" 
                      onClick={() => completeToDo(item.id)}
                      className={item.completed ? 'strikethrough' : ''}
                    >
                      {item.completed ? 'To Do' : 'Done'}
                    </button>
                    <button type="button" aria-label={`Delete item ${item.id}`} onClick={() => deleteToDo(item.id)}>X</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        } 

        { list.length === 0 &&
          <div>No results to display</div>
        }
      </div>
    );
  }  
  // if (hasError) { // finished loading, but has error
  //   return <div>Error loading</div>;
  // }
  return <div>Loading...</div>;
}

export default List;
