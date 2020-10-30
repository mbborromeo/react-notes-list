import React, { useState, useCallback } from 'react';
import NoteTextArea from '../../Shared/NoteTextArea/NoteTextArea';
import PriorityDropDown from '../../Shared/PriorityDropDown/PriorityDropDown';

function AddForm({ addFunction }) {
  const [newItem, setNewItem] = useState('');
  const [itemPriority, setItemPriority] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!newItem || !itemPriority ) {        
        alert('Note must not be empty and priority must be selected')
        return; // exit if field empty
      }
      
      addFunction(newItem, itemPriority);
      // reset field to empty
      setNewItem('');
      setItemPriority('');
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
          setNewItem('');
          setItemPriority('');
        }}
      />
    </form>
  );
}

export default AddForm;
