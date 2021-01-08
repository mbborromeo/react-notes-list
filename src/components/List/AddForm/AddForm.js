import React, { useState, useCallback } from 'react';
import NoteTextArea from '../../Shared/NoteTextArea/NoteTextArea';
import PriorityDropDown from '../../Shared/PriorityDropDown/PriorityDropDown';
import { useForm } from "react-hook-form";
import '../../Detail/Detail.css';

function AddForm({ addFunction }) {
  // https://react-hook-form.com/get-started#Integratinganexistingform
  const { 
    register, 
    handleSubmit, 
    errors, 
    //watch, 
    reset, 
    getValues, 
    formState  
  } = useForm( {defaultValues: { note: "", priority: "" }} );

  // Read the formState before render to subscribe the form state through Proxy  
  const { isSubmitSuccessful } = formState; 

  // console.log('Note is', watch("note")) // watch input value by passing a name to it - defined in NoteTextArea.js
  
  const onActualSubmit = (data) => {    
    addFunction( getValues("note"), getValues("priority") ); //addFunction( data.note, data.priority );
    resetFields();
  };
  
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
      <NoteTextArea label="note" ref={ register({ required: true }) } />
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

        { isSubmitSuccessful && !getValues("note") && !getValues("priority") &&
          <span className="confirmation">
            Note added.
          </span>
        }
      </div>
    </form>
  );
}

export default AddForm;
