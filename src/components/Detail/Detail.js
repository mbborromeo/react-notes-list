import React, {
  useState, useEffect, useMemo //, useCallback
} from 'react';
import { Link } from 'react-router-dom';
//import DataService from '../../services/DataService';
import '../../App.css';

function Detail({ match }) {  
  const [list, setList] = useState( [] );
  const [detail, setDetail] = useState({});
  const [loaded, setLoaded] = useState(false);
  //const [hasError, setHasError] = useState(false);
  const detailID = match.params.id;

  // save a memoized copy of the function for re-use instead of creating a new function each time
  /*
  const dataService = useMemo(
    () => new DataService(),
    []
  );
  */

  /*
  useEffect(() => {
    if (detailID) {
      dataService.getDetail(detailID)
        .then((response) => {
          // handle success
          console.log('getDetail response', response)
          setDetail(response);
          setLoaded(true);
        })
        .catch((error) => {
          // handle error
          console.error('axios.jsonp CATCH', error);
          setHasError(true);
        })
        .finally(() => {
          // always executed
        });
    }
  },
  [dataService, detailID]);
  */
  useEffect(() => {
    const localList = JSON.parse( localStorage.getItem('localList') );

    if (localList) {
      setList( localList );
      //setDetail( localList[detailID] ); //.detailID
      setLoaded(true);
    }
  }, []); //detailID


  if (loaded && list.length > 0) { //Object.keys(detail).length
    return (
      <div>
        <h3>Note</h3>

        <span id="note">
          { list[detailID-1].content }
        </span>
        <br /><br />
        
        <span id="id">
          ID:
          {' '}
          { detailID }
        </span>
        <br /><br />
        
        <span id="completed">
          Priority:
          {' '}
          { list[detailID-1].priority }
        </span>

        <br />
        <br />
        <Link
          to="/"
          className="button back"
        >
          &lt; Back
        </Link>
      </div>
    );
  } if (loaded && list.length === 0) { // Object.keys(detail).length
    return <div>No detail to display</div>;
  } /*if (hasError) {
    return <div>Error loading</div>;
  }
  */
  return <div>Loading...</div>;
}

export default Detail;
