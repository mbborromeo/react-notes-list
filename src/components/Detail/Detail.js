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

  const detailID = parseInt(match.params.id);
  const currentItem = list[detailID - 1];

  const { 
    register, 
    handleSubmit, 
    errors, 
    setError,
    reset, 
    formState 
  } = useForm();

  const { isDirty, dirtyFields, isSubmitSuccessful, submitCount } = formState; 
  console.log('------------------------------------');
  console.log('isDirty', isDirty, dirtyFields)
  console.log('errors', errors)
  console.log('isSubmitSuccessful', isSubmitSuccessful, submitCount)

  useEffect(() => {
    const localList = JSON.parse( localStorage.getItem('localList') );

    if (localList && localList[detailID-1]) {
      setList( localList );
      
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

      // set form field values to new values, so 'isDirty' will compare to latest values 
      reset(
        {
          noteEdit: text,
          priorityEdit: priority
        }
      );
    },
    [list, detailID, reset]
  );
  
  const onActualSubmit = useCallback(
    ({ noteEdit, priorityEdit }) => {
      if (currentItem.content === noteEdit && currentItem.priority === priorityEdit) {
        setError("noteEdit", {
          message: "No change has been made."
        });
        return;
      }
      editToDo( noteEdit, priorityEdit );
    },
    [editToDo, currentItem, setError]
  );

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (list.length === 0) {
    return <div>No detail to display</div>;
  }
  
  return (
    <div>
      <h3>Note - ID { detailID }</h3>

      <form onSubmit={ handleSubmit(onActualSubmit) }>
        <NoteTextArea 
          view="detail" 
          label="noteEdit" 
          // register={ register } 
          // required
          ref={ register({ required: 'Note must not be empty.' }) }          
        />
        <br /><br />          
        
        <PriorityDropDown 
          label="priorityEdit" 
          ref={ register({ required: 'Priority must be selected.' }) } // required: true
        />
        <br /><br />

        <button type="submit">Update</button>
      </form>

      <br />
      <div id="feedback">
        { errors.noteEdit &&
          <span className="error">{ errors.noteEdit.message }</span>
        }
        { errors.priorityEdit &&
          <span className="error">{errors.priorityEdit.message}</span>
        }
        { isSubmitSuccessful && !isDirty &&
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
}

export default Detail;
