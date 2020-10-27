import React, {
  useState, useEffect, useCallback, useMemo
} from 'react';
import { Link } from 'react-router-dom';
import AddForm from './AddForm/AddForm';
import './List.css';

// Reference: https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks
function List() {
  const [list, setList] = useState( [] );
  const [filterConfig, setFilterConfig] = useState({ key: 'all' }); // , direction: 'ascending'

  const getArrayIndexOfItem = useCallback(
    (id) => {
      const isItemOfInterest = (element) => element.id === id;
      return list.findIndex(isItemOfInterest);
    },
    [list]
  );

  const deleteToDo = useCallback(
    (id) => {
      const filteredList = list.filter((elem) => elem.id !== id);
      setList(filteredList);
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
    (text, priority) => {
      const newListItem = {
        id: getMaxID() + 1,
        content: text,
        priority: priority
      };

      const newList = [...list, newListItem]; // add new item to end of list
      setList(newList);
    },
    [list, getMaxID]
  );  

  const requestFilter = useCallback(
    (key) => {
      // set to new key
      setFilterConfig({ key });
    },
    [filterConfig] // dependencies that require a re-render for
  ); 

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

  const filteredResults = useMemo(
    () => {
      if (list) {
        if( filterConfig.key==="all" ){
          return list
        } else {
          const filteredList = list.filter( (note) => note.priority===filterConfig.key );
          return filteredList;
        }        
      }
      return undefined;
    },
    [list, filterConfig]
  );
  
  // possibly use useMemo here, and/or define a function for sort
  if (filteredResults) {
    return (
      <div>
        <div id="header">
          <h1>Notes List</h1>
          <AddForm addFunction={addToDo} />
        </div>
        
        <table>
          <thead>
            <tr>
              <th>
                Note
              </th>
              <th className="width-quarter">
                Priority&nbsp;
                <select 
                  value={ filterConfig.key }
                  onChange={ (e) => requestFilter(e.target.value) }
                >
                  <option value="all">ALL</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </th>
              <th className="width-quarter">
                Actions                
              </th>
            </tr>
          </thead>                
          
          { filteredResults.length > 0 && 
          <tbody>
            {
              filteredResults.map((item) => (
                <tr key={item.id}>
                  <td className="content">
                    <Link
                      to={`/detail/${item.id}`}
                      data-id={item.id}
                    >
                      { item.content }
                    </Link>
                  </td>
                  <td>
                    { item.priority }
                  </td>
                  <td>
                    <Link
                      to={`/detail/${item.id}`}
                      data-id={item.id}
                    >
                      Edit
                    </Link>
                    <button type="button" aria-label={`Delete item ${item.id}`} onClick={() => deleteToDo(item.id)}>X</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
          }
        </table>

        { list.length === 0 &&
          <div>No results to display</div>
        }
      </div>
    );
  }
  return <div>Loading...</div>;
}

export default List;
