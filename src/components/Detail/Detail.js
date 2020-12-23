import React, {
  useState, useEffect, useCallback //, useMemo
} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './Detail.css';
import NoteTextArea from '../Shared/NoteTextArea/NoteTextArea';
import PriorityDropDown from '../Shared/PriorityDropDown/PriorityDropDown';

function Detail({ match }) {  
  const [list, setList] = useState( [] );
  const [loaded, setLoaded] = useState(false);
  const [existingNote, setExistingNote] = useState('');
  const [existingPriority, setExistingPriority] = useState('');
  // Use useRef to get reference of previous state  
  // ie. https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
  // or manually created a previous 'saved' value state for note and priority
  // const [savedNote, setSavedNote] = useState('');
  // const [savedPriority, setSavedPriority] = useState('');
  const [showNoChangesValidationMsg, setShowNoChangesValidationMsg] = useState(false);
  const [showChangesSavedConfirmationMsg, setShowChangesSavedConfirmationMsg] = useState(false);
  
  const detailID = parseInt(match.params.id);  

  const { 
    register, 
    handleSubmit, 
    errors, 
    //setValue,
    getValues,
    reset, 
    formState 
    //, watch
  } = useForm();

  const { isDirty, dirtyFields, isSubmitSuccessful } = formState; 
  console.log('isDirty', isDirty)
  console.log('dirtyFields', dirtyFields)

  // const watchNoteEdit = watch("noteEdit");
  // const watchPriorityEdit = watch("priorityEdit");

  useEffect(() => {
    const localList = JSON.parse( localStorage.getItem('localList') );

    if (localList && localList[detailID-1]) {
      setList( localList );
      setExistingNote( localList[detailID-1].content );
      setExistingPriority( localList[detailID-1].priority );
      // setSavedNote( localList[detailID-1].content );
      // setSavedPriority( localList[detailID-1].priority );
      
      // set form field values to localStorage. setValue() not working so used reset()
      reset(
        {
          noteEdit: localList[detailID-1].content,
          priorityEdit: localList[detailID-1].priority
        }
      );

      setLoaded(true);
    }
  }, [detailID, reset]);

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
      // setSavedNote(text);
      // setSavedPriority(priority);
      reset(
        {
          noteEdit: text,
          priorityEdit: priority
        }
      );

      setShowChangesSavedConfirmationMsg(true);
    },
    [list, detailID]
  );

  /*
  const checkHasChanged = useCallback(
    () => {      
      //if( watchNoteEdit && (watchNoteEdit!==savedNote || watchPriorityEdit!==savedPriority) ){
      if( existingNote && (existingNote!==savedNote || existingPriority!==savedPriority) ){ 
        setShowNoChangesValidationMsg(false);
        console.log("changed occured")
        return true;        
      } else {          
        setShowNoChangesValidationMsg(true);
        console.log("existing different from saved note/priority!")
        return false;
      }
    },
    [existingNote, existingPriority, savedNote, savedPriority]
  );
  */
  
  const onActualSubmit = useCallback(
    (data) => {
      setShowChangesSavedConfirmationMsg(false); 

      if( isDirty ){ // checkHasChanged
        setShowNoChangesValidationMsg(false);

        editToDo(existingNote, existingPriority);
        //editToDo(watchNoteEdit, watchPriorityEdit);
      } else {
        setShowNoChangesValidationMsg(true);
      }
    },
    [existingNote, existingPriority, editToDo, isDirty]
  );
  
  const handleTextAreaOnChange = useCallback(
    (e) => {
      setShowChangesSavedConfirmationMsg(false);
      setExistingNote( getValues("noteEdit") );

      //checkHasChanged();
      if( isDirty ){
        setShowNoChangesValidationMsg(false);
      } else {
        setShowNoChangesValidationMsg(true);
      }
    },
    [getValues, isDirty]
  );

  const handleSelectOnChange = useCallback(
    (e) => {
      console.log('handleSelectOnChange!!!')
      setShowChangesSavedConfirmationMsg(false);
      setExistingPriority( getValues("priorityEdit") );

      //checkHasChanged();
      if( isDirty ){
        console.log('isDirty setting showNoChangesValidationMsg to false')
        setShowNoChangesValidationMsg(false);
      } else {
        console.log('isDirty setting showNoChangesValidationMsg to true')
        setShowNoChangesValidationMsg(true);
      }
    },
    [getValues, isDirty]
  );

  if (loaded && list.length > 0) {
    return (
      <div>
        <h3>Note - ID { detailID }</h3>

        <form onSubmit={ handleSubmit(onActualSubmit) }>
          <NoteTextArea 
            view="detail" 
            label="noteEdit" 
            register={ register } 
            required
            handleOnChange={ handleTextAreaOnChange }
          />
          <br /><br />          
          
          <PriorityDropDown 
            label="priorityEdit" 
            ref={ register({ required: true }) }
            handleOnChange={ handleSelectOnChange }
          />
          <br /><br />

          <button type="submit">Update</button>
        </form>

        <br />
        <div id="feedback">
          { errors.noteEdit &&
            <span className="error">
              Note must not be empty.
            </span>
          }
          { showNoChangesValidationMsg && !isDirty && 
            <span className="error">
              No change has been made.
            </span>
          }
          { showChangesSavedConfirmationMsg &&
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
