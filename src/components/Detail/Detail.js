import React, {
  useState, useEffect, useCallback //, useMemo
} from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Detail({ match }) {  
  const [list, setList] = useState( [] );
  const [existingNote, setExistingNote] = useState('');
  const [existingPriority, setExistingPriority] = useState('');
  const [loaded, setLoaded] = useState(false);
  const detailID = parseInt(match.params.id);

  useEffect(() => {
    const localList = JSON.parse( localStorage.getItem('localList') );

    if (localList) {
      setList( localList );
      setExistingNote( localList[detailID-1].content );
      setExistingPriority( localList[detailID-1].priority );
      setLoaded(true);
    }
  }, [detailID]);

  useEffect(() => {
    localStorage.setItem( 'localList', JSON.stringify( list ) );
  }, [list]);

  const editToDo = useCallback(
    (text, priority) => {
      const newListItem = {
        id: detailID,
        content: text,
        priority: priority
      };

      // update array item at index detailID
      const newList = [...list];
      newList[detailID-1] = newListItem;
      setList(newList);
      setLoaded(true);
    },
    [list, detailID]
  ); 

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoaded(false);

      if (!existingNote || !existingPriority ) {        
        alert('Note must not be empty and priority must be selected')
        return; // exit if field empty
      }
      
      editToDo(existingNote, existingPriority);

      // notify user note was saved and go back to Homepage
      if( loaded ){
        alert('Note has been updated')
      }
    },
    [existingNote, existingPriority, loaded, editToDo]
  );

  if (loaded && list.length > 0) {
    return (
      <div>
        <h3>Note</h3>

        <form onSubmit={handleSubmit}>
          <textarea 
            id="note" 
            name="note" 
            rows="4" 
            cols="40"
            wrap="hard"
            value={ existingNote } 
            onChange={(e) => setExistingNote(e.target.value)}
          />          
          <br /><br />
          
          <span id="id">
            ID:
            {' '}
            { detailID }
          </span>
          <br /><br />

          <select 
            name="priority" 
            id="priority" 
            value={ existingPriority }
            onChange={(e) => setExistingPriority(e.target.value) }
          >            
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
          <br /><br />

          <button type="submit">Update</button>
        </form>

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
  } if (loaded && list.length === 0) {
    return <div>No detail to display</div>;
  }
  return <div>Loading...</div>;
}

export default Detail;
