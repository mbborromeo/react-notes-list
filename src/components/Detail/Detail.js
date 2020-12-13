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
  const [feedbackMessage, setFeedbackMessage] = useState('');
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
      setFeedbackMessage('Note updated');
    },
    [list, detailID]
  ); 

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!existingNote && !existingPriority ) {
        setFeedbackMessage('Note must not be empty and priority must be selected');
        return; // exit if field empty
      }

      if (!existingNote && existingPriority ) {
        setFeedbackMessage('Note must not be empty');
        return; // exit if field empty
      }

      if (existingNote && !existingPriority ) {
        setFeedbackMessage('Priority must be selected');
        return; // exit if field empty
      }

      /*
      if (existingNote===prevState.existingNote && existingPriority===prevState.existingPriority) {
        setFeedbackMessage('No change has been made');
        return; // exit if field empty
      }
      */
      
      editToDo(existingNote, existingPriority);

      // notify user note was saved and go back to Homepage

    },
    [existingNote, existingPriority, editToDo]
  );

  const handleTextAreaOnChange = useCallback(
    (e) => {
      setExistingNote(e.target.value)
    },
    []
  );

  const handleSelectOnChange = useCallback(
    (e) => {
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
          { feedbackMessage }
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
