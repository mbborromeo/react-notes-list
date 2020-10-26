import React, {
  useState, useEffect, useMemo //, useCallback
} from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/DataService';
import '../../App.css';

function Detail({ match }) {  
  const [detail, setDetail] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const detailID = match.params.id;

  // save a memoized copy of the function for re-use instead of creating a new function each time
  const dataService = useMemo(
    () => new DataService(),
    []
  );

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

  if (loaded && Object.keys(detail).length > 0) {
    return (
      <div>
        <span id="id">
          ID:
          {' '}
          { detailID }
        </span>
        <br />

        <span id="title">
          Title:
          {' '}
          { detail.title }
        </span>
        <br />
        
        <span id="completed">
          Completed:
          {' '}
          { detail.completed.toString() }
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
  } if (loaded && Object.keys(detail).length === 0) {
    return <div>No detail to display</div>;
  } if (hasError) {
    return <div>Error loading</div>;
  }
  return <div>Loading...</div>;
}

export default Detail;
