import React, {
  useState, useEffect, useCallback //, useMemo
} from 'react';
import { Link } from 'react-router-dom';
import './Detail.css';
import NoteTextArea from '../Shared/NoteTextArea/NoteTextArea';
import PriorityDropDown from '../Shared/PriorityDropDown/PriorityDropDown';

function Detail({ match }) {  
  const [list, setList] = useState( [] );
  const [existingNote, setExistingNote] = useState('');
  const [existingPriority, setExistingPriority] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [showContentValidationMsg, setShowContentValidationMsg] = useState(false);
  const [showNoChangesValidationMsg, setShowNoChangesValidationMsg] = useState(false);
  const [showChangesSavedConfirmationMsg, setShowChangesSavedConfirmationMsg] = useState(false);
  const detailID = parseInt(match.params.id);
  // Use useRef to get reference of previous state  
  // ie. https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
  // or manually created a previous value state for note and priority
  const [savedNote, setSavedNote] = useState('');
  const [savedPriority, setSavedPriority] = useState('');

  useEffect(() => {
    const localList = JSON.parse( localStorage.getItem('localList') );

    if (localList) {
      setList( localList );
      setExistingNote( localList[detailID-1].content );
      setExistingPriority( localList[detailID-1].priority );
      setSavedNote( localList[detailID-1].content );
      setSavedPriority( localList[detailID-1].priority );
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
      setSavedNote(text);
      setSavedPriority(priority);
      setShowChangesSavedConfirmationMsg(true);
    },
    [list, detailID]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setShowChangesSavedConfirmationMsg(false);

      if (!existingNote) {
        setShowContentValidationMsg(true);
      } else {
        setShowContentValidationMsg(false);
      }

      if (existingNote && existingNote===savedNote && existingPriority===savedPriority) {
        setShowNoChangesValidationMsg(true);
      } else {
        setShowNoChangesValidationMsg(false);
      }
      
      if( existingNote && (existingNote!==savedNote || existingPriority!==savedPriority) ){
        editToDo(existingNote, existingPriority);
      }      

      // notify user note was saved and go back to Homepage

    },
    [existingNote, existingPriority, savedNote, savedPriority, editToDo]
  );

  const handleTextAreaOnChange = useCallback(
    (e) => {
      setShowChangesSavedConfirmationMsg(false);
      setExistingNote(e.target.value)
    },
    []
  );

  const handleSelectOnChange = useCallback(
    (e) => {
      setShowChangesSavedConfirmationMsg(false);
      setExistingPriority(e.target.value)
    },
    []
  );

  if (loaded && list.length > 0) {
    return (
      <div>
        <h3>Note - ID { detailID }</h3>

        <form onSubmit={handleSubmit}>
          <NoteTextArea view="detail" value={ existingNote } handleOnChange={ handleTextAreaOnChange } />
          <br /><br />
          
          <PriorityDropDown value={ existingPriority } handleOnChange={ handleSelectOnChange } />
          <br /><br />

          <button type="submit">Update</button>
        </form>

        <br />
        <div id="feedback">
          { showContentValidationMsg &&
            <span className="error">
              Note must not be empty.
            </span>
          }
          { showNoChangesValidationMsg &&
            <span className="error">
              No change has been made.
            </span>
          }
          {
            showChangesSavedConfirmationMsg &&
            <span className="confirmation">
              Note updated.
            </span>
          }
        </div>

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
