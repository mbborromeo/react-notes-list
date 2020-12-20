import React, { useState, useCallback } from 'react';
import NoteTextArea from '../../Shared/NoteTextArea/NoteTextArea';
import PriorityDropDown from '../../Shared/PriorityDropDown/PriorityDropDown';
import { useForm } from "react-hook-form";
import '../../Detail/Detail.css';

function AddForm({ addFunction }) {
  //const [showNoteAddedConfirmationMsg, setShowNoteAddedConfirmationMsg] = useState(false);

  // https://react-hook-form.com/get-started
  // https://react-hook-form.com/get-started#Integratinganexistingform
  // Q - where does 'ref' come from?
  const { register, handleSubmit, errors, watch, reset, getValues } = useForm();
  const onActualSubmit = (data) => {
    console.log('data to submit:', data)    
    //addFunction( data.note, data.priority );
    addFunction( getValues("note"), getValues("priority") );
    resetFields();
    /*
    setShowNoteAddedConfirmationMsg(true);
    */
  };

  console.log( 'Note is', watch("note") ) // watch input value by passing a name to it - defined in NoteTextArea.js

  // add useCallback or useMemo...
  // https://react-hook-form.com/api#reset
  const resetFields = () => {
    if( getValues("note") || getValues("priority") ){
      reset(
        {
          note: "",
          priority: ""
        }
      );
    }    
  }

  return (
    <form onSubmit={ handleSubmit(onActualSubmit) }>
      <NoteTextArea label="note" register={ register } required />
      <br />
      
      <PriorityDropDown label="priority" ref={ register({ required: true }) } />
      &nbsp;&nbsp;

      <button type="submit">Add</button>
      &nbsp;

      <input
        type="button"
        value="Clear"
        onClick={() => {
          resetFields();          
        }}
      />

      <br />
      <div id="feedback">
        { errors.note &&
          <span className="error">
            Note must not be empty.&nbsp;
          </span>
        }

        { errors.priority &&
          <span className="error">
            Priority must be selected.
          </span>
        }

        {/* showNoteAddedConfirmationMsg &&
          <span className="confirmation">
            Note added.
          </span>
        */
        }
      </div>
    </form>
  );
}

export default AddForm;
