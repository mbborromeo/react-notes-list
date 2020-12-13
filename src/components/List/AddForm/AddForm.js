import React, { useState, useCallback } from 'react';
import NoteTextArea from '../../Shared/NoteTextArea/NoteTextArea';
import PriorityDropDown from '../../Shared/PriorityDropDown/PriorityDropDown';
import '../../Detail/Detail.css';

function AddForm({ addFunction }) {
  const [newItem, setNewItem] = useState('');
  const [itemPriority, setItemPriority] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const resetFields = () => {
    setNewItem('');
    setItemPriority('');
    setFeedbackMessage('');
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!newItem && !itemPriority) {        
        setFeedbackMessage('Note must not be empty and priority must be selected');
        return; // exit if field empty
      }

      if (!newItem && itemPriority) {        
        setFeedbackMessage('Note must not be empty');
        return; // exit if field empty
      }

      if (!itemPriority && newItem) {        
        setFeedbackMessage('Priority must be selected');
        return; // exit if field empty
      }
      
      addFunction(newItem, itemPriority);
      resetFields();
    },
    [newItem, itemPriority, addFunction]
  );

  const handleTextAreaOnChange = useCallback(
    (e) => {
      setNewItem(e.target.value)
    },
    []
  );

  const handleSelectOnChange = useCallback(
    (e) => {
      setItemPriority(e.target.value)
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <NoteTextArea value={ newItem } handleOnChange={ handleTextAreaOnChange } />
      <br />
      
      <PriorityDropDown value={ itemPriority } handleOnChange={ handleSelectOnChange } />
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
        { feedbackMessage }
      </div>
    </form>
  );
}

export default AddForm;
